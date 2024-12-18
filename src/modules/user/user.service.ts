import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { compare } from "bcrypt";

import { User } from "../../models/users.model";
import { LoginUserDTO } from "../auth/dto/login-user.dto";
import { UserWithoutParams } from "../../types/common";
import { AppError } from "../../common/errors";
import { deleteUserParams } from "../../utils";

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

  async findUserById(id: number): Promise<User | undefined> {
    const existingUser = await this.usersRepository.findOne({
      where: { id },
      attributes: {
        exclude: ["password", "updatedAt"],
      },
    });
    if (!existingUser) throw new NotFoundException(AppError.USER_DONT_EXIST);
    return existingUser;
  }

  async validateUser(dto: LoginUserDTO): Promise<UserWithoutParams> {
    const existingUser = await this.findUserByEmail(dto.email);
    if (!existingUser) throw new NotFoundException(AppError.USER_DONT_EXIST);

    const isPasswordValid = await compare(dto.password, existingUser.password);
    if (!isPasswordValid) return null;

    return deleteUserParams(existingUser.dataValues);
  }
}
