import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";

import { User } from "../../models/users.model";
import { UserModule } from "../user/user.module";
import { JWTModule } from "../jwt/jwt.module";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    UserModule,
    PassportModule,
    JWTModule,
    JwtModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
