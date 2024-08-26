import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { PassportModule } from "@nestjs/passport";

import { LocalStrategy } from "src/strategy/local.strategy";

import { User } from "../../models/users.model";

import { TokenModule } from "../token/token.module";
import { UserModule } from "../user/user.module";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    TokenModule,
    UserModule,
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
