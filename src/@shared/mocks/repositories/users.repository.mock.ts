import { TUser } from '@users/types/users.type';
import { IUsersRepository } from '@users/users.repository.interface';

//@ts-ignore
export const usersRepositoryMock: IUsersRepository = (...mocks: TUser[]) => ({
  deleteById: () => Promise.resolve(true),
  findAll: () =>
    Promise.resolve(mocks.map((mock) => ({ ...mock, password: undefined }))),
  findById: () => Promise.resolve({ ...mocks[0], password: undefined }),
  save: () => Promise.resolve({ ...mocks[0], password: undefined }),
  update: () => Promise.resolve({ ...mocks[0], password: undefined }),
});
