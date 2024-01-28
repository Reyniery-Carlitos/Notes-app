import { IsString, MaxLength, MinLength, isDateString, IsBoolean, IsNumber, IsOptional, IsDateString } from "class-validator";

export class NoteCreateDTO {
  @IsString()
  @MinLength(1)
  @MaxLength(100)
    title: string;

  @IsString()
  @MinLength(1)
  @MaxLength(500)
    description: string;
  
  @IsDateString()
    date: Date;
  
  @IsBoolean()
    isArchived: boolean;
  
  @IsBoolean()
    isActive: boolean;
  
  @IsNumber()
  @IsOptional()
    categoryId?: number | null;

  @IsNumber()
    userId: number;
}

export class NoteUpdateDTO {
  @IsString()
  @MinLength(1)
  @MaxLength(100)
    title: string;

  @IsString()
  @MinLength(1)
  @MaxLength(500)
    description: string;
  
  @IsDateString()
    date: Date;
  
  @IsBoolean()
    isArchived: boolean;
  
  @IsBoolean()
    isActive: boolean;
  
  @IsNumber()
  @IsOptional()
    categoryId?: number | null;

  @IsNumber()
    userId: number;
}