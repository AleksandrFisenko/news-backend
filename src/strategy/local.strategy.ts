import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";

import { AppError } from "src/common/errors";
import { AuthService } from "src/modules/auth/auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: "email",
    });
  }

  async validate(email: string, password: string) {
    const loginUserDto = { email, password };
    const user = await this.authService.validateUser(loginUserDto);
    if (!user) throw new UnauthorizedException(AppError.INVALID_CREDENTIALS);
    return user;
  }
}
