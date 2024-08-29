import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";

import { AppError } from "../../common/errors";
import { UserWithoutParams } from "../../types/common";
import { UserService } from "../user/user.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      usernameField: "email",
    });
  }

  async validate(email: string, password: string): Promise<UserWithoutParams> {
    const user = await this.userService.validateUser({ email, password });
    if (!user) throw new UnauthorizedException(AppError.INVALID_CREDENTIALS);
    return user;
  }
}
