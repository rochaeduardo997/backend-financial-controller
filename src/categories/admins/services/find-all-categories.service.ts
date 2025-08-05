import { ICategoriesRepository } from '@categories/categories.repository.interface';
import { TCategory } from '@categories/types/categories.type';
import { Inject, Injectable } from '@nestjs/common';
import { FindAllCategoriesDTO } from '@categories/admins/dtos/find-all-categories.dto';

@Injectable()
export class FindAllCategoriesService {
  constructor(
    @Inject('ICategoriesRepository')
    private readonly cRepo: ICategoriesRepository,
  ) {}

  async execute(input?: FindAllCategoriesDTO): Promise<TOutput> {
    const result = await this.cRepo.findAll(input);
    return result;
  }
}

type TOutput = TCategory[];
