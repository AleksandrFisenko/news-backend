import { Controller, Get } from "@nestjs/common";

import { PostsService } from "./posts.service";
import { Post } from "./models/post.model";

@Controller("posts")
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getPosts(): Promise<Post[]> {
    return this.postsService.getPosts();
  }
}
