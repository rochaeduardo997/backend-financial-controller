import { usersRepositoryMock } from '@shared/mocks/repositories/users.repository.mock';
import { userMock } from '@shared/mocks/types/users.type.mock';
import { TUser } from '@users/types/users.type';
import { IUsersRepository } from '@users/users.repository.interface';
import { config } from 'dotenv';
import { AdminUsersService } from '@users/admins/services/admins.service';
config();

describe('AdminUsersService', () => {
  let service: AdminUsersService;

  const userMock1: TUser = userMock(1);
  const userMock2: TUser = userMock(2);

  beforeAll(() => {
    const uRepo: IUsersRepository = usersRepositoryMock(userMock1, userMock2);
    service = new AdminUsersService(uRepo);
  });

  test('should find all users', async () => {
    const result = await service.findAll.execute({ page: 1, limit: 25 });
    const expected = [
      { ...userMock1, password: undefined },
      { ...userMock2, password: undefined },
    ];
    expect(result).toEqual(expected);
  });
});
