import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";

import { AuthService } from "./auth.service";
import { CreateUserDTO } from "./dto/create-user.dto";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("registration")
  createUser(@Body() dto: CreateUserDTO) {
    return this.authService.createUser(dto);
  }

  @UseGuards(LocalAuthGuard)
  @Post("login")
  loginUser(@Request() dto) {
    return this.authService.loginUser(dto.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  getProfile(@Request() req) {
    return this.authService.getProfile(req.user.email);
  }
}
