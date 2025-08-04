import { ICategoriesRepository } from '@categories/categories.repository.interface';
import { UpdateCategoryDTO } from '@categories/dtos/update-category.dto';
import { TCategory } from '@categories/types/categories.type';
import { ForbiddenException, Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UpdateCategoryService {
  constructor(
    @Inject('ICategoriesRepository')
    private readonly cRepo: ICategoriesRepository,
  ) {}

  async execute(input: TInput): Promise<TOutput> {
    await this.verifyIfIsSameOwner({
      id: input.id,
      userId: input.userId,
    });
    const result = await this.cRepo.update({ ...input });
    return result;
  }

  private async verifyIfIsSameOwner({
    id,
    userId,
  }: Pick<TInput, 'id' | 'userId'>) {
    const data = await this.cRepo.findByIdFromUser({ id, userId });
    if (!data) throw new ForbiddenException();
  }
}

type TInput = UpdateCategoryDTO & { id: number; userId: number };
type TOutput = TCategory;
