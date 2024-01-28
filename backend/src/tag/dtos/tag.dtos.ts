import { IsString, MaxLength, MinLength } from "class-validator";

export class TagCreateDTO {
  @IsString()
  @MinLength(1)
  @MaxLength(30)
  name: string;
}

export class TagUpdateDTO {
  @IsString()
  @MinLength(1)
  @MaxLength(30)
  name: string;
}