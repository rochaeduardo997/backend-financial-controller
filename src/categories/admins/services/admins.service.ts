import { ICategoriesRepository } from '@categories/categories.repository.interface';
import { FindAllCategoriesService } from '@categories/admins/services/find-all-categories.service';
import { Inject, Injectable } from '@nestjs/common';
import { FindCategoryByIdService } from '@categories/admins/services/find-category-by-id.service';
import { SaveCategoryService } from '@categories/services/save-category.service';
import { UpdateCategoryService } from '@categories/services/update-category.service';

@Injectable()
export class AdminCategoriesService {
  findAll: FindAllCategoriesService;
  findById: FindCategoryByIdService;
  save: SaveCategoryService;
  update: UpdateCategoryService;

  constructor(
    @Inject('ICategoriesRepository')
    private readonly cRepo: ICategoriesRepository,
  ) {
    this.findAll = new FindAllCategoriesService(cRepo);
    this.findById = new FindCategoryByIdService(cRepo);
    this.save = new SaveCategoryService(cRepo);
    this.update = new UpdateCategoryService(cRepo);
  }
}
