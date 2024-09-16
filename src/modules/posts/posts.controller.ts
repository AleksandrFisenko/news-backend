import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";

import { PostsService } from "./posts.service";
import { Post } from "./models/post.model";

@Controller("posts")
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getPosts(): Promise<Post[]> {
    return this.postsService.getPosts();
  }

  @Get("user/:userId")
  getPostsByUserId(
    @Param("userId", ParseIntPipe) userId: number
  ): Promise<Post[]> {
    return this.postsService.getPostsByUserId(userId);
  }
}
