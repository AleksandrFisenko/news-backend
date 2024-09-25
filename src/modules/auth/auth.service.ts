import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { genSalt, hash } from "bcrypt";
import { JwtService } from "@nestjs/jwt";

import { User } from "../../models/users.model";
import { AppError } from "../../common/errors";
import { deleteUserParams } from "../../utils/deleteParams";
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
    const salt = await genSalt();
    return hash(password, salt);
  }

  async generateToken(user: UserWithoutParams): Promise<string> {
    const payload = { sub: user.id, email: user.email };
    return await this.jwtService.signAsync(payload);
  }

  async createUser(dto: CreateUserDTO): Promise<LoginResponce> {
    const existingUser = await this.userService.findUserByEmail(dto.email);
    if (existingUser) throw new ConflictException(AppError.USER_EXISTS);

    const password = await this.hashPassword(dto.password);
    try {
      const user = await this.usersRepository.create({
        email: dto.email,
        login: dto.login,
        password: password,
      });

      const userWithoutParams = deleteUserParams(user.dataValues);
      return {
        token: await this.generateToken(userWithoutParams),
        user: userWithoutParams,
      };
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  async loginUser(dto: UserWithoutParams): Promise<LoginResponce> {
    return {
      token: await this.generateToken(dto),
      user: dto,
    };
  }
}
