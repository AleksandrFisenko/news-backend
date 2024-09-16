import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";

import { User } from "../../models/users.model";

import { UserService } from "./user.service";

@Controller("users")
export class UserController {
  constructor(private readonly postsService: UserService) {}

  @Get(":id")
  getUser(@Param("id", ParseIntPipe) id: number): Promise<User> {
    console.log(typeof id)
    return this.postsService.findUserById(id);
  }
}
