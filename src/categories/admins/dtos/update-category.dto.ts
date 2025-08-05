import { PartialType } from '@nestjs/mapped-types';
import { AdminSaveCategoryDTO } from '@categories/admins/dtos/save-category.dto';
import { Min, IsInt } from 'class-validator';
import { Transform } from 'class-transformer';

export class AdminUpdateCategoryDTO extends PartialType(AdminSaveCategoryDTO) {
  @Min(1)
  @IsInt()
  @Transform(({ value }) => +value)
  userId: number;
}
