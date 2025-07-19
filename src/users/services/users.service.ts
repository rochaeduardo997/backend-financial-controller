import { Inject, Injectable } from '@nestjs/common';
import { IUsersRepository } from '@users/users.repository.interface';
import { SaveUserService } from '@users/services/save-user.service';

@Injectable()
export class UsersService {
  save: SaveUserService;

  constructor(
    @Inject('IUsersRepository')
    private readonly uRepo: IUsersRepository,
  ) {
    this.save = new SaveUserService(uRepo);
  }
}
