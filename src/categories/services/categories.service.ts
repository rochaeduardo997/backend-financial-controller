import { Inject, Injectable } from '@nestjs/common';
import { FindCategoryByIdService } from '@categories/services/find-category-by-id.service';
import { ICategoriesRepository } from '@categories/categories.repository.interface';
import { SaveCategoryService } from '@categories/services/save-category.service';
import { UpdateCategoryService } from '@categories/services/update-category.service';

@Injectable()
export class CategoriesService {
  findById: FindCategoryByIdService;
  save: SaveCategoryService;
  update: UpdateCategoryService;

  constructor(
    @Inject('ICategoriesRepository')
    private readonly cRepo: ICategoriesRepository,
  ) {
    this.findById = new FindCategoryByIdService(cRepo);
    this.save = new SaveCategoryService(cRepo);
    this.update = new UpdateCategoryService(cRepo);
  }
}
