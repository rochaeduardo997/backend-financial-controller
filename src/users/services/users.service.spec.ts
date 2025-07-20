import { usersRepositoryMock } from '@shared/mocks/repositories/users.repository.mock';
import { UsersService } from '@users/services/users.service';
import { TUser } from '@users/types/users.type';
import { IUsersRepository } from '@users/users.repository.interface';
import { config } from 'dotenv';
config();

describe('UsersService', () => {
  let service: UsersService;
  const userMock1: TUser = {
    email: 'email',
    id: 100,
    name: 'name',
    password: 'password',
    username: 'username',
  };
  const userMock2: TUser = {
    email: 'email',
    id: 101,
    name: 'name',
    password: 'password',
    username: 'username',
  };

  beforeAll(() => {
    //@ts-ignore
    const uRepo: IUsersRepository = usersRepositoryMock(userMock1, userMock2);
    service = new UsersService(uRepo);
  });

  test('should save a new user', async () => {
    const result = await service.save.execute(userMock1);
    const expected = { ...userMock1, password: undefined };
    expect(result).toEqual(expected);
  });
});
