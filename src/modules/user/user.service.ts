import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { User } from "src/models/users.model";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly usersRepository: typeof User
  ) {}

  async findUserByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({
      where: {
        email,
      },
    });
  }
}
