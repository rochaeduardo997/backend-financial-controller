import { MinLength, MaxLength, IsString, IsOptional } from 'class-validator';

export class SaveCategoryDTO {
  @MinLength(3)
  @MaxLength(50)
  @IsString()
  name: string;

  @MaxLength(70)
  @IsString()
  @IsOptional()
  description: string;
}
