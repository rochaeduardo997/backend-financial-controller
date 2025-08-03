/* eslint-disable @typescript-eslint/no-unsafe-return */
import { ICategoriesRepository } from '@categories/categories.repository.interface';
import { TCategory } from '@categories/types/categories.type';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class FindAllCategoriesService {
  constructor(
    @Inject('ICategoriesRepository')
    private readonly cRepo: ICategoriesRepository,
  ) {}

  async execute(input: TInput): Promise<TOutput> {
    const result = await this.cRepo.findAllFromUser({
      userId: input.userId,
    });
    return result;
  }
}

type TInput = { userId: number };
type TOutput = TCategory[];
