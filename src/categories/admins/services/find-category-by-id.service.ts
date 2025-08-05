import { ICategoriesRepository } from '@categories/categories.repository.interface';
import { TCategory } from '@categories/types/categories.type';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class FindCategoryByIdService {
  constructor(
    @Inject('ICategoriesRepository')
    private readonly cRepo: ICategoriesRepository,
  ) {}

  async execute(input: TInput): Promise<TOutput> {
    const result = await this.cRepo.findById(input.id);
    return result;
  }
}

type TInput = { id: number };
type TOutput = TCategory;
