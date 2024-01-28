import { Transform } from "class-transformer";
import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsEmail
} from "class-validator";

export class UserCreateDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(100)
  password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(100)
  confirmPassword: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
    username: string;
  
  @IsNotEmpty()
  @IsEmail()
  @Transform(({ value }) => value.trim())
    email: string;
}
