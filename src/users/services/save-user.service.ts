import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDTO } from '@users/dtos/create-user.dto';
import { TUser } from '@users/types/users.type';
import { IUsersRepository } from '@users/users.repository.interface';
import { scryptSync } from 'crypto';

@Injectable()
export class SaveUserService {
  private readonly PASSWORD_ENCRYPT_SECRET =
    process.env.PASSWORD_ENCRYPT_SECRET || 'secret';
  private readonly PASSWORD_ENCRYPT_LENGTH =
    process.env.PASSWORD_ENCRYPT_LENGTH || 2;

  constructor(
    @Inject('IUsersRepository')
    private readonly uRepo: IUsersRepository,
  ) {}

  async execute(input: CreateUserDTO): Promise<TOutput> {
    const password = scryptSync(
      input.password,
      this.PASSWORD_ENCRYPT_SECRET,
      +this.PASSWORD_ENCRYPT_LENGTH,
    ).toString('hex');
    const result = await this.uRepo.save({ ...input, password });
    return result;
  }
}

type TOutput = Omit<TUser, 'passowrd'>;
