import { config } from 'dotenv';
import { AdminCategoriesService } from '@categories/admins/services/admins.service';
import { categoryMock } from '@shared/mocks/types/categories.type.mock';
import { ICategoriesRepository } from '@categories/categories.repository.interface';
import { categoriesRepositoryMock } from '@shared/mocks/repositories/categories.repository.mock';
config();

describe('AdminCategoriesService', () => {
  let service: AdminCategoriesService;

  const categoryMock1 = categoryMock(1);
  const categoryMock2 = categoryMock(2);

  beforeAll(() => {
    const cRepo: ICategoriesRepository = categoriesRepositoryMock(
      categoryMock1,
      categoryMock2,
    );
    service = new AdminCategoriesService(cRepo);
  });

  test('should find all categories', async () => {
    const result = await service.findAll.execute({ page: 1, limit: 25 });
    const expected = [{ ...categoryMock1 }, { ...categoryMock2 }];
    expect(result).toEqual(expected);
  });

  test('should find category by id', async () => {
    const result = await service.findById.execute({ id: 1 });
    const expected = categoryMock1;
    expect(result).toEqual(expected);
  });

  test('should save a new category', async () => {
    const result = await service.save.execute(categoryMock1);
    const expected = categoryMock1;
    expect(result).toEqual(expected);
  });

  test('should update an existing category', async () => {
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
});
