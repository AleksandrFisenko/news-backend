import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { Post } from "./models/post.model";
import { Tag } from "./models/tag.model";
import { Users } from "src/modules/users/users.model";

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post)
    private readonly postsRepository: typeof Post
  ) {}

  getPosts(): Promise<Post[]> {
    return this.postsRepository.findAll({
      attributes: { exclude: ["createdAt", "user_id"] },
      include: [
        {
          model: Users,
          as: "user",
          attributes: ["id", "email", "avatar_url"],
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
}
