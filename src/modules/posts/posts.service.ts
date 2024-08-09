import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Posts } from "./models/post.model";

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Posts) private readonly postsRepository: typeof Posts
  ) {}

  async getPosts(): Promise<Posts[]> {
    return this.postsRepository.findAll();
  }
}
