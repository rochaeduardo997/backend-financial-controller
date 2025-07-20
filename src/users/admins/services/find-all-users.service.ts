import { Inject, Injectable } from '@nestjs/common';
import { FindAllUsersDTO } from '@users/admins/dtos/find-all-users.dto';
import { TUser } from '@users/types/users.type';
import { IUsersRepository } from '@users/users.repository.interface';

@Injectable()
export class FindAllUsersService {
  constructor(
    @Inject('IUsersRepository')
    private readonly uRepo: IUsersRepository,
  ) {}

  async execute(input?: FindAllUsersDTO): Promise<TOutput> {
    const result = await this.uRepo.findAll(input);
    return result;
  }
}

type TOutput = Omit<TUser, 'passowrd'>[];
