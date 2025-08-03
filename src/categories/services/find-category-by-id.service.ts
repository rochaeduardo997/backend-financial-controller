import { ICategoriesRepository } from '@categories/categories.repository.interface';
import { FindCategoryByIdDTO } from '@categories/dtos/find-category-by-id.dto';
import { TCategory } from '@categories/types/categories.type';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class FindCategoryByIdService {
  constructor(
    @Inject('ICategoriesRepository')
    private readonly cRepo: ICategoriesRepository,
  ) {}

  async execute(input: FindCategoryByIdDTO): Promise<TOutput> {
    const result = await this.cRepo.findById(input.id);
    return result;
  }
}

type TOutput = TCategory;
