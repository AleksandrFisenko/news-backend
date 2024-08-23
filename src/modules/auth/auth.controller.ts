import { Body, Controller, Post } from "@nestjs/common";

import { AuthService } from "./auth.service";
import { CreateUserDTO } from "./dto/create-user.dto";
import { LoginUserDTO } from "./dto/login-user.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("registration")
  createUser(@Body() dto: CreateUserDTO) {
    return this.authService.createUser(dto);
  }

  @Post("login")
  loginUser(@Body() dto: LoginUserDTO) {
    return this.authService.loginUser(dto);
  }
}
