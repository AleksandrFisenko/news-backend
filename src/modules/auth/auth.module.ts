import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { PassportModule } from "@nestjs/passport";

import { User } from "../../models/users.model";
import { UserModule } from "../user/user.module";
import { JWTModule } from "../jwt/jwt.module";
import { JwtStrategy } from "../jwt/jwt.strategy";
import { LocalStrategy } from "../jwt/local.strategy";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    UserModule,
    PassportModule,
    JWTModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy
  ],
})
export class AuthModule {}
