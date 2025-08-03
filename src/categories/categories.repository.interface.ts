import { TCategory } from '@categories/types/categories.type';
import { IDefaultRepositories } from '@shared/interfaces/default-repositories.interface';

export interface ICategoriesRepository extends IDefaultRepositories<TCategory> {
  findByIdFromUser(input: TFindFromUser): Promise<TCategory>;
  findAllFromUser(input: Omit<TFindFromUser, 'id'>): Promise<TCategory[]>;
}

type TFindFromUser = { id: number; userId: number };
