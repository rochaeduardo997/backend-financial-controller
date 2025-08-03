import { ICategoriesRepository } from '@categories/categories.repository.interface';
import { SaveCategoryDTO } from '@categories/dtos/save-category.dto';
import { TCategory } from '@categories/types/categories.type';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class SaveCategoryService {
  constructor(
    @Inject('ICategoriesRepository')
    private readonly cRepo: ICategoriesRepository,
  ) {}

  async execute(input: SaveCategoryDTO): Promise<TOutput> {
    const result = await this.cRepo.save({ ...input });
    return result;
  }
}

type TOutput = TCategory;
