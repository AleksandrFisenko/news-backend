import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { User } from "../../models/users.model";

import { Post } from "./models/post.model";
import { Tag } from "./models/tag.model";

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post)
    private readonly postsRepository: typeof Post
  ) {}

  getPosts(): Promise<Post[]> {
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

  getPostsByUserId(id: number): Promise<Post[]> {
    return this.postsRepository.findAll({
      where: { userId: id },
      attributes: { exclude: ["createdAt", "userId"] },
    });
  }
}
