import { Inject, Injectable } from '@nestjs/common';
import { IUsersRepository } from '@users/users.repository.interface';
import { SaveUserService } from '@users/services/save-user.service';
import { UpdateUserService } from './update-user.service';

@Injectable()
export class UsersService {
  save: SaveUserService;
  update: UpdateUserService;

  constructor(
    @Inject('IUsersRepository')
    private readonly uRepo: IUsersRepository,
  ) {
    this.save = new SaveUserService(uRepo);
    this.update = new UpdateUserService(uRepo);
  }
}
