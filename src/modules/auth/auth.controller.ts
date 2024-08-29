import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";

import {
  LoginResponce,
  UserRequest,
  UserWithoutParams,
} from "../../types/common";

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
  @HttpCode(200)
  @Post("login")
  loginUser(@Request() dto: UserRequest): Promise<LoginResponce> {
    return this.authService.loginUser(dto.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  getProfile(@Request() req: UserRequest): UserWithoutParams {
    return req.user;
  }
}
