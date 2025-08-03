import { TCategory } from '@categories/types/categories.type';
import { IDefaultRepositories } from '@shared/interfaces/default-repositories.interface';

export interface ICategoriesRepository
  extends IDefaultRepositories<TCategory> {}
