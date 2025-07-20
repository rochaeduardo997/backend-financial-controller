import { Inject, Injectable } from '@nestjs/common';
import { SaveUserDTO } from '@users/dtos/save-user.dto';
import { TUser } from '@users/types/users.type';
import { IUsersRepository } from '@users/users.repository.interface';
import { scryptSync } from 'crypto';

@Injectable()
export class SaveUserService {
  private readonly PASSWORD_ENCRYPT_SECRET =
    process.env.PASSWORD_ENCRYPT_SECRET || 'secret';
  private readonly PASSWORD_ENCRYPT_LENGTH =
    process.env.PASSWORD_ENCRYPT_LENGTH || 10;

  constructor(
    @Inject('IUsersRepository')
    private readonly uRepo: IUsersRepository,
  ) {}

  async execute(input: SaveUserDTO): Promise<TOutput> {
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
