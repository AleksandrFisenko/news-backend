import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDTO {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  login: string;

  @IsNotEmpty()
  password: string;
}
