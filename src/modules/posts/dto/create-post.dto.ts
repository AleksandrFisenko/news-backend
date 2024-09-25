import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePostDTO {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    text: string;

    @IsArray()
    @IsString({ each: true })
    @IsNotEmpty({ each: true })
    tags: string[];
  }