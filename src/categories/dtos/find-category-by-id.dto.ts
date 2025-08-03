import { Transform } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class FindCategoryByIdDTO {
  @Min(1)
  @IsInt()
  @Transform(({ value }) => +value)
  id: number;
}
