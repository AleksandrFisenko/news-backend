import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";

import { LoginResponce, UserWithoutParams } from "../../types/common";
import { AuthService } from "./auth.service";
import { CreateUserDTO } from "./dto/create-user.dto";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("registration")
  createUser(@Body() dto: CreateUserDTO): Promise<LoginResponce> {
    return this.authService.createUser(dto);
  }

  @UseGuards(LocalAuthGuard)
  @Post("login")
  loginUser(@Request() dto): Promise<LoginResponce> {
    return this.authService.loginUser(dto.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  getProfile(@Request() req): Promise<UserWithoutParams> {
    return req.user;
  }
}
