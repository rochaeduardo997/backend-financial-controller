import { ICategoriesRepository } from '@categories/categories.repository.interface';
import { categoryMock } from '@shared/mocks/types/categories.type.mock';
import { config } from 'dotenv';
import { CategoriesService } from '@categories/services/categories.service';
import { categoriesRepositoryMock } from '@shared/mocks/repositories/categories.repository.mock';
config();

describe('UsersService', () => {
  let service: CategoriesService;

  const categoryMock1 = categoryMock(1);
  const categoryMock2 = categoryMock(2);

  beforeAll(() => {
    const cRepo: ICategoriesRepository = categoriesRepositoryMock(
      categoryMock1,
      categoryMock2,
    );
    service = new CategoriesService(cRepo);
  });

  test('should save a new user', async () => {
    const result = await service.save.execute(categoryMock1);
    const expected = { ...categoryMock1 };
    expect(result).toEqual(expected);
  });

  test('should update an existing user', async () => {
    const result = await service.update.execute({
      ...categoryMock2,
      id: categoryMock1.id,
    });
    const expected = {
      ...categoryMock2,
      id: categoryMock1.id,
    };
    expect(result).toEqual(expected);
  });

  test('should find category by id', async () => {
    const result = await service.findById.execute({
      id: categoryMock1.id,
      userId: categoryMock1.userId,
    });
    const expected = { ...categoryMock1 };
    expect(result).toEqual(expected);
  });

  test('should find all categories by user id', async () => {
    const result = await service.findAll.execute({
      userId: categoryMock1.userId,
    });
    const expected = [categoryMock1, categoryMock2];
    expect(result).toEqual(expected);
  });
});
