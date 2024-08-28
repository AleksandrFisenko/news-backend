import { ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { hash } from "bcrypt";
import { JwtService } from "@nestjs/jwt";

import { User } from "../../models/users.model";
import { AppError } from "../../common/errors";
import { deleteUserParams } from "../../utils";
import { LoginResponce, UserWithoutParams } from "../../types/common";
import { UserService } from "../user/user.service";

import { CreateUserDTO } from "./dto/create-user.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private readonly usersRepository: typeof User,
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async hashPassword(password: string): Promise<string> {
    return hash(password, 10);
  }

  async generateToken(user: UserWithoutParams): Promise<string> {
    const payload = { sub: user.id, email: user.email };
    return await this.jwtService.signAsync(payload);
  }

  async createUser(dto: CreateUserDTO): Promise<LoginResponce> {
    const existingUser = await this.userService.findUserByEmail(dto.email);
    if (existingUser) throw new ConflictException(AppError.USER_EXISTS);

    dto.password = await this.hashPassword(dto.password);
    const user = await this.usersRepository.create({
      email: dto.email,
      login: dto.login,
      password: dto.password,
    });

    const userWithoutParams = deleteUserParams(user.dataValues);
    return {
      token: await this.generateToken(userWithoutParams),
      user: userWithoutParams,
    };
  }

  async loginUser(dto: UserWithoutParams): Promise<LoginResponce> {
    return {
      token: await this.generateToken(dto),
      user: dto,
    };
  }
}
