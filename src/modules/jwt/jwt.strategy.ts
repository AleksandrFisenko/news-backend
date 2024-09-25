import { Injectable, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

import { JwtPayload, UserWithoutParams } from "../../types/common";
import { UserService } from "../user/user.service";
import { deleteUserParams } from "../../utils/deleteParams";
import { AppError } from "../../common/errors";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get("JWT_SECRET"),
    });
  }

  async validate(payload: JwtPayload): Promise<UserWithoutParams> {
    const user = await this.userService.findUserByEmail(payload.email);
    if (!user) throw new NotFoundException(AppError.USER_DONT_EXIST);
    return deleteUserParams(user.dataValues);
  }
}
