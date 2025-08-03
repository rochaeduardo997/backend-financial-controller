/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
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

  async execute(input: TInput): Promise<TOutput> {
    const result = await this.cRepo.findByIdFromUser({
      id: input.id,
      userId: input.userId,
    });
    return result;
  }
}

type TInput = FindCategoryByIdDTO & { userId: number };
type TOutput = TCategory;
