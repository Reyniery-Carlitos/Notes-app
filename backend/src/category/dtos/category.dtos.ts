import { IsString, MaxLength, MinLength } from "class-validator";

export class CategoryCreateDTO {
  @IsString()
  @MinLength(1)
  @MaxLength(40)
  name: string
}

export class CategoryUpdateDTO {
  @IsString()
  @MinLength(1)
  @MaxLength(40)
  name: string
}