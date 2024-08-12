import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";

import { PostsController } from "./posts.controller";
import { PostsService } from "./posts.service";
import { Post } from "./models/post.model";
import { Tag } from "./models/tag.model";
import { PostTags } from "./models/postTags.model";

@Module({
  imports: [SequelizeModule.forFeature([Post, Tag, PostTags])],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
