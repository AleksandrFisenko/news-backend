import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  login: string;

  @IsNotEmpty()
  password: string;
}
