import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { Users } from "src/modules/users/users.model";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users)
    private readonly usersRepository: typeof Users
  ) {}
}
