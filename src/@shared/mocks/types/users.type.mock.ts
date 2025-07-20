import { TUser } from '@users/types/users.type';
import { scryptSync } from 'crypto';

const PASSWORD_ENCRYPT_SECRET = process.env.PASSWORD_ENCRYPT_SECRET || 'secret';
const PASSWORD_ENCRYPT_LENGTH = process.env.PASSWORD_ENCRYPT_LENGTH || 10;

export const userMock = (index: number): TUser => ({
  email: `email${index}@email.com`,
  id: index,
  name: 'name',
  password: scryptSync(
    'password',
    PASSWORD_ENCRYPT_SECRET,
    +PASSWORD_ENCRYPT_LENGTH,
  ).toString('hex'),
  username: `username${index}`,
});
