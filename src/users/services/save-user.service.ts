import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDTO } from '@users/dtos/create-user.dto';
import { TUser } from '@users/types/users.type';
import { IUsersRepository } from '@users/users.repository.interface';

@Injectable()
export class SaveUserService {
  constructor(
    @Inject('IUsersRepository')
    private readonly uRepo: IUsersRepository,
  ) {}

  async execute(input: CreateUserDTO): Promise<TOutput> {
    const result = await this.uRepo.save(input);
    return result;
  }
}

type TOutput = Omit<TUser, 'passowrd'>;
