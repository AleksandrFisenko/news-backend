import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { User } from "src/models/users.model";
import { LoginUserDTO } from "../auth/dto/login-user.dto";
import { UserWithoutParams } from "src/types/common";
import { AppError } from "src/common/errors";
import { compare } from "bcrypt";
import { deleteUserParams } from "src/utils";

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

  async validateUser(dto: LoginUserDTO): Promise<UserWithoutParams> {
    const existingUser = await this.findUserByEmail(dto.email);
    if (!existingUser) throw new NotFoundException(AppError.USER_DONT_EXIST);

    const isPasswordValid = await compare(dto.password, existingUser.password);
    if (!isPasswordValid) return null;

    return deleteUserParams(existingUser.dataValues);
  }
}
