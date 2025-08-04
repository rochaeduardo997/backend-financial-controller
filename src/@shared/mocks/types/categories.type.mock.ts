export const categoryMock = (index: number) => ({
  id: index,
  name: `name${index}`,
  description: 'description',
  createdAt: new Date('2022-01-01').toISOString(),
  updatedAt: new Date('2022-01-02').toISOString(),
  userId: 1,
});
