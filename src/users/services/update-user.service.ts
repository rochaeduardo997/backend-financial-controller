import { Inject, Injectable } from '@nestjs/common';
import { UpdateUserDTO } from '@users/dtos/update-user.dto';
import { TUser } from '@users/types/users.type';
import { IUsersRepository } from '@users/users.repository.interface';

@Injectable()
export class UpdateUserService {
  constructor(
    @Inject('IUsersRepository')
    private readonly uRepo: IUsersRepository,
  ) {}

  async execute(input: TInput): Promise<TOutput> {
    const result = await this.uRepo.update({ ...input });
    return result;
  }
}

type TInput = UpdateUserDTO & { id: number };
type TOutput = Omit<TUser, 'passowrd'>;
