import { TUser } from '@users/types/users.type';
import { IDefaultRepositories } from '@shared/interfaces/default-repositories.interface';

export interface IUsersRepository extends IDefaultRepositories<TUser> {}
