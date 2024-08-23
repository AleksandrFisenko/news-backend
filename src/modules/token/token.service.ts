import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { UserWithoutParams } from "src/types/common";

@Injectable()
export class TokenService {
  constructor(private jwtService: JwtService) {}

  async generateToken(user: UserWithoutParams) {
    const payload = { id: user.id, email: user.email };
    return await this.jwtService.signAsync(payload);
  }
}
