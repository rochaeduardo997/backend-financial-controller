import { TCategory } from '@categories/types/categories.type';

export const categoryMock = (index: number): TCategory => ({
  id: index,
  name: `name${index}`,
  description: 'description',
  createdAt: new Date('2022-01-01'),
  updatedAt: new Date('2022-01-02'),
});
