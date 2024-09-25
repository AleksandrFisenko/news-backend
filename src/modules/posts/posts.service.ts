import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { ConfigService } from "@nestjs/config";
import { join } from "path";
import { unlink } from "fs";

import { User } from "../../models/users.model";
import { AppError, ErrorNames } from "../../common/errors";
import { UserService } from "../user/user.service";

import { CreatePostDTO } from "./dto/create-post.dto";
import { Post } from "./models/post.model";
import { Tag } from "./models/tag.model";
import { PostTags } from "./models/postTags.model";

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post)
    private readonly postsRepository: typeof Post,
    @InjectModel(PostTags)
    private readonly postTagsRepository: typeof PostTags,
    private readonly userService: UserService,
    private readonly configService: ConfigService
  ) {}

  async getPosts(): Promise<Post[]> {
    return this.postsRepository.findAll({
      attributes: { exclude: ["createdAt", "userId"] },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "email", "avatarUrl"],
        },
        {
          model: Tag,
          as: "tags",
          attributes: ["id", "name"],
          through: { attributes: [] },
        },
      ],
    });
  }

  async getPostById(id: number) {
    return this.postsRepository.findOne({
      where: { id },
      attributes: { exclude: ["createdAt", "userId"] },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "email", "avatarUrl"],
        },
        {
          model: Tag,
          as: "tags",
          attributes: ["id", "name"],
          through: { attributes: [] },
        },
      ],
    });
  }

  async getPostsByUserId(id: number): Promise<Post[]> {
    const existingUser = await this.userService.findUserById(id);
    if (!existingUser) throw new NotFoundException(AppError.USER_DONT_EXIST);

    return this.postsRepository.findAll({
      where: { userId: id },
      attributes: { exclude: ["createdAt", "userId"] },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "email", "avatarUrl"],
        },
        {
          model: Tag,
          as: "tags",
          attributes: ["id", "name"],
          through: { attributes: [] },
        },
      ],
    });
  }

  async createPost(
    userId: number,
    post: CreatePostDTO,
    file: Express.Multer.File
  ) {
    const transaction = await this.postsRepository.sequelize.transaction();
    try {
      const createdPost = await this.postsRepository.create(
        {
          userId,
          title: post.title,
          text: post.text,
          imageUrl: `${this.configService.get("POST_URL")}${file.filename}`,
        },
        { transaction }
      );

      await Promise.all(
        post.tags.map((tagId) =>
          this.postTagsRepository.create(
            {
              postId: createdPost.dataValues.id,
              tagId,
            },
            { transaction }
          )
        )
      );
      await transaction.commit();

      return this.getPostById(createdPost.dataValues.id);
    } catch (error) {
      await transaction.rollback();
      const filePath = join(__dirname, "../../..", "static/posts", file.filename);
      unlink(filePath, ()=>{});

      if (error.name === ErrorNames.UNIQUE_ERROR)
        throw new ConflictException(AppError.POST_EXISTS);
      if (error.name === ErrorNames.FOREIGN_KEY_ERROR)
        throw new BadRequestException(AppError.TAGS_NOT_FOUND);
      throw new InternalServerErrorException();
    }
  }
}
