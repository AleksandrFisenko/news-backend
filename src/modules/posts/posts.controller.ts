import { Controller, Get, Param, ParseIntPipe, Query } from "@nestjs/common";

import { PostsService } from "./posts.service";
import { Post } from "./models/post.model";

@Controller("posts")
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getPostsByUserId(@Query("author") authorId?: string): Promise<Post[]> {
    if (authorId) return this.postsService.getPostsByUserId(parseInt(authorId));
    return this.postsService.getPosts();
  }
}
