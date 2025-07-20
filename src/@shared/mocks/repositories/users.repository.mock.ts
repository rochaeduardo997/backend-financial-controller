import { TUser } from '@users/types/users.type';
import { IUsersRepository } from '@users/users.repository.interface';

export const usersRepositoryMock = (...mocks: TUser[]): IUsersRepository => ({
  deleteById: () => Promise.resolve(true),
  findAll: () =>
    //@ts-ignore
    Promise.resolve(mocks.map((mock) => ({ ...mock, password: undefined }))),
  //@ts-ignore
  findById: () => Promise.resolve({ ...mocks[0], password: undefined }),
  //@ts-ignore
  save: () => Promise.resolve({ ...mocks[0], password: undefined }),
  //@ts-ignore
  update: () => Promise.resolve({ ...mocks[0], password: undefined }),
});
