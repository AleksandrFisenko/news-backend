import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";

import { UserModule } from "../user/user.module";

import { PostsController } from "./posts.controller";
import { PostsService } from "./posts.service";
import { Post } from "./models/post.model";
import { Tag } from "./models/tag.model";
import { PostTags } from "./models/postTags.model";

@Module({
  imports: [
    SequelizeModule.forFeature([Post, Tag, PostTags]),
    UserModule,
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
