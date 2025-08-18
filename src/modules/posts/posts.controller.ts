import {
  Controller,
  Get,
  Query,
  Post,
  UseGuards,
  Request,
  Param,
  Body,
  UploadedFile,
  ParseFilePipeBuilder,
  HttpStatus,
  UseInterceptors,
  ParseIntPipe,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";

import { UserRequest } from "../../types/common";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { editFileName } from "../../utils";
import { imageFileFilter } from "../../utils";

import { PostsService } from "./posts.service";
import { CreatePostDTO } from "./dto/create-post.dto";


@Controller("posts")
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getPostsByUserId(@Query("author") authorId?: string) {
    if (authorId) return this.postsService.getPostsByUserId(parseInt(authorId));
    return this.postsService.getPosts();
  }

  @Get(":id")
  getPostById(@Param("id", ParseIntPipe) id: number) {
    return this.postsService.getPostById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: "./static/posts",
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    })
  )
  createPost(
    @Request() req: UserRequest,
    @Body() post: CreatePostDTO,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addMaxSizeValidator({
          maxSize: 10 * 1024 * 1024,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        })
    )
    file: Express.Multer.File
  ) {
    return this.postsService.createPost(req.user.id, post, file);
  }
}
