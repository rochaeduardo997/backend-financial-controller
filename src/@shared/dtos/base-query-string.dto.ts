import { Transform } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class BaseQueryStringDTO {
  @Min(1)
  @IsInt()
  @Transform(({ value }) => +value)
  @IsOptional()
  page: number;

  @Max(100)
  @Min(1)
  @IsInt()
  @Transform(({ value }) => +value)
  @IsOptional()
  limit: number;
}
