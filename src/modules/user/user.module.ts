import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";

import { User } from "src/models/users.model";

import { UserService } from "./user.service";

@Module({
  imports: [SequelizeModule.forFeature([User])],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
