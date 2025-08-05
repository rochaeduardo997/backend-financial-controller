import { SaveCategoryDTO } from '@categories/dtos/save-category.dto';
import { Min, IsInt } from 'class-validator';
import { Transform } from 'class-transformer';

export class AdminSaveCategoryDTO extends SaveCategoryDTO {
  @Min(1)
  @IsInt()
  @Transform(({ value }) => +value)
  userId: number;
}
