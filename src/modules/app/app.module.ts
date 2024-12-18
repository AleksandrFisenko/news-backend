import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { MulterModule } from "@nestjs/platform-express";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";

import { User } from "../../models/users.model";
import { PostsModule } from "../posts/posts.module";
import { Post } from "../posts/models/post.model";
import { Tag } from "../posts/models/tag.model";
import { PostTags } from "../posts/models/postTags.model";
import { AuthModule } from "../auth/auth.module";
import { UserModule } from "../user/user.module";
import { JWTModule } from "../jwt/jwt.module";


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
        models: [Post, Tag, User, PostTags],
      }),
    }),
    MulterModule.register({
      dest: "./static",
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../..', 'static/posts'),
      serveRoot: '/static/posts',
    }),
    PostsModule,
    AuthModule,
    UserModule,
    JWTModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
