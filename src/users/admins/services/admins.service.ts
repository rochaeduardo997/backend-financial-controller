import { Inject, Injectable } from '@nestjs/common';
import { IUsersRepository } from '@users/users.repository.interface';
import { FindAllUsersService } from './find-all-users.service';

@Injectable()
export class AdminUsersService {
  findAll: FindAllUsersService;

  constructor(
    @Inject('IUsersRepository')
    private readonly uRepo: IUsersRepository,
  ) {
    this.findAll = new FindAllUsersService(uRepo);
  }
}
