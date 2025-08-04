import { ICategoriesRepository } from '@categories/categories.repository.interface';

export const categoriesRepositoryMock = (
  ...mocks: any[]
): ICategoriesRepository => ({
  findAllFromUser: () => Promise.resolve(mocks),
  findByIdFromUser: () => Promise.resolve(mocks[0]),
  deleteById: () => Promise.resolve(true),
  findAll: () =>
    //@ts-ignore
    Promise.resolve(mocks),
  //@ts-ignore
  findById: () => Promise.resolve({ ...mocks[0] }),
  //@ts-ignore
  save: () => Promise.resolve({ ...mocks[0] }),
  update: () =>
    //@ts-ignore
    Promise.resolve({ ...mocks[1], id: mocks[0].id }),
});
