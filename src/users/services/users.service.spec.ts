import { UsersService } from '@users/services/users.service';
import { TUser } from '@users/types/users.type';
import { IUsersRepository } from '@users/users.repository.interface';

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
    const uRepo: IUsersRepository = {
      deleteById: () => Promise.resolve(true),
      findAll: () =>
        //@ts-ignore
        Promise.resolve([
          { ...userMock1, password: undefined },
          { ...userMock2, password: undefined },
        ]),
      //@ts-ignore
      findById: () => Promise.resolve({ ...userMock1, password: undefined }),
      //@ts-ignore
      save: () => Promise.resolve({ ...userMock1, password: undefined }),
      //@ts-ignore
      update: () => Promise.resolve({ ...userMock1, password: undefined }),
    };
    service = new UsersService(uRepo);
  });

  test('should save a new user', async () => {
    const result = await service.save.execute(userMock1);
    const expected = { ...userMock1, password: undefined };
    expect(result).toEqual(expected);
  });
});
