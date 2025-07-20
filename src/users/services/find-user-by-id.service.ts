import { Inject, Injectable } from '@nestjs/common';
import { FindUserByIdDTO } from '@users/dtos/find-user-by-id.dto';
import { TUser } from '@users/types/users.type';
import { IUsersRepository } from '@users/users.repository.interface';

@Injectable()
export class FindUserByIdService {
  constructor(
    @Inject('IUsersRepository')
    private readonly uRepo: IUsersRepository,
  ) {}

  async execute(input: FindUserByIdDTO): Promise<TOutput> {
    const result = await this.uRepo.findById(input.id);
    return result;
  }
}

type TOutput = Omit<TUser, 'passowrd'>;
