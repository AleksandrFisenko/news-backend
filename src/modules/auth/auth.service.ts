import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { compare, hash } from "bcrypt";
import { JwtService } from "@nestjs/jwt";

import { User } from "src/models/users.model";
import { AppError } from "src/common/errors";
import { deleteUserParams } from "src/utils";
import { UserWithoutParams } from "src/types/common";

import { CreateUserDTO } from "./dto/create-user.dto";
import { LoginUserDTO } from "./dto/login-user.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private readonly usersRepository: typeof User,
    private jwtService: JwtService
  ) {}

  async findUserByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({
      where: {
        email,
      },
    });
  }

  async hashPassword(password: string): Promise<string> {
    return hash(password, 10);
  }

  async createUser(
    dto: CreateUserDTO
  ): Promise<{ token: string; user: UserWithoutParams }> {
    const existingUser = await this.findUserByEmail(dto.email);
    if (existingUser) throw new ConflictException(AppError.USER_EXISTS);

    dto.password = await this.hashPassword(dto.password);
    const user = await this.usersRepository.create({
      email: dto.email,
      login: dto.login,
      password: dto.password,
    });

    const userWithoutParams = deleteUserParams(user.dataValues);
    const payload = { sub: user.id, username: user.email };
    return {
      token: await this.jwtService.signAsync(payload),
      user: userWithoutParams,
    };
  }

  async loginUser(
    dto: LoginUserDTO
  ): Promise<{ token: string; user: UserWithoutParams }> {
    const existingUser = await this.findUserByEmail(dto.email);
    if (!existingUser) throw new NotFoundException(AppError.USER_DONT_EXIST);

    const isPasswordValid = await compare(dto.password, existingUser.password);
    if (!isPasswordValid) throw new UnauthorizedException(AppError.INVALID_CREDENTIALS);

    const userWithoutParams = deleteUserParams(existingUser.dataValues);
    const payload = { sub: existingUser.id, email: existingUser.email };
    return {
      token: await this.jwtService.signAsync(payload),
      user: userWithoutParams,
    };
  }
}
