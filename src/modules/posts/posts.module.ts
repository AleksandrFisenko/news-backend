import { Module } from "@nestjs/common";
import { PostsController } from "./posts.controller";
import { PostsService } from "./posts.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Posts } from "./models/post.model";
import { Tags } from "./models/tags.model";
import { PostTags } from "./models/postTags.model";

@Module({
  imports: [SequelizeModule.forFeature([Posts, Tags, PostTags])],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
