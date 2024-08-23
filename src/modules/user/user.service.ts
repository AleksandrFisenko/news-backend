import { Injectable } from "@nestjs/common";
import { User } from "src/models/users.model";

@Injectable()
export class UserService {
  // constructor(private readonly usersRepository: typeof User) {}

  // async findUserByEmail(email: string): Promise<User | undefined> {
  //   return this.usersRepository.findOne({
  //     where: {
  //       email,
  //     },
  //   });
  // }
}
