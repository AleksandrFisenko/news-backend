import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";

import { PostsModule } from "../posts/posts.module";
import { Post } from "../posts/models/post.model";
import { Tag } from "../posts/models/tag.model";
import { PostTags } from "../posts/models/postTags.model";
import { Users } from "db/models/users.model";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: configService.get("DB_DIALECT"),
        host: configService.get("DB_HOST"),
        port: Number(configService.get("DB_PORT")),
        username: configService.get("DB_USER"),
        password: configService.get("DB_PASSWORD"),
        database: configService.get("DB_NAME"),
        models: [Post, Tag, Users, PostTags],
      }),
    }),
    PostsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
