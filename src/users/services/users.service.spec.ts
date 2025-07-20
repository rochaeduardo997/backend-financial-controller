import { usersRepositoryMock } from '@shared/mocks/repositories/users.repository.mock';
import { userMock } from '@shared/mocks/types/users.type.mock';
import { UsersService } from '@users/services/users.service';
import { TUser } from '@users/types/users.type';
import { IUsersRepository } from '@users/users.repository.interface';
import { config } from 'dotenv';
config();

describe('UsersService', () => {
  let service: UsersService;

  const userMock1: TUser = userMock(1);
  const userMock2: TUser = userMock(2);

  beforeAll(() => {
    const uRepo: IUsersRepository = usersRepositoryMock(userMock1, userMock2);
    service = new UsersService(uRepo);
  });

  test('should save a new user', async () => {
    const result = await service.save.execute(userMock1);
    const expected = { ...userMock1, password: undefined };
    expect(result).toEqual(expected);
  });

  test('should update an existing user', async () => {
    const result = await service.update.execute({
      ...userMock2,
      id: userMock1.id,
    });
    const expected = { ...userMock2, id: userMock1.id, password: undefined };
    expect(result).toEqual(expected);
  });
});
