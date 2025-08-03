/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
import { ICategoriesRepository } from '@categories/categories.repository.interface';
import { UpdateCategoryDTO } from '@categories/dtos/update-category.dto';
import { TCategory } from '@categories/types/categories.type';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UpdateCategoryService {
  constructor(
    @Inject('ICategoriesRepository')
    private readonly cRepo: ICategoriesRepository,
  ) {}

  async execute(input: TInput): Promise<TOutput> {
    const result = await this.cRepo.update({ ...input });
    return result;
  }
}

type TInput = UpdateCategoryDTO & { id: number };
type TOutput = TCategory;
