import { Controller, Get } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { Posts } from "./models/post.model";

@Controller("posts")
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getPosts(): Promise<Posts[]> {
    return this.postsService.getPosts();
  }
}
