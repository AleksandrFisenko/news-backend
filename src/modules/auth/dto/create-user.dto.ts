import { Transform, TransformFnParams } from "class-transformer";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class CreateUserDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @MinLength(3)
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value.trim())
  login: string;

  @MinLength(6)
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value.trim())
  password: string;
}
