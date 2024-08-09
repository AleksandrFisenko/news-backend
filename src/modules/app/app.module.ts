import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { PostsModule } from "../posts/posts.module";
import { Posts } from "../posts/models/post.model";
import { Tags } from "../posts/models/tags.model";
import { Users } from "db/models/users.model";
import { PostTags } from "../posts/models/postTags.model";

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
        models: [Posts, Tags, Users, PostTags],
      }),
    }),
    PostsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
