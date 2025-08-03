import {
  Body,
  Catch,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@shared/guards/auth.guard';
import { AdminUsersService } from '@users/admins/services/admins.service';
import { FindAllUsersDTO } from '@users/admins/dtos/find-all-users.dto';
import { UsersService } from '@users/services/users.service';
import { UpdateUserDTO } from '@users/dtos/update-user.dto';
import { SaveUserDTO } from '@users/dtos/save-user.dto';

@Controller('admin/users')
@Catch()
@UseGuards(AuthGuard)
export class AdminUsersController {
  constructor(
    @Inject(AdminUsersService)
    private readonly adminUsersService: AdminUsersService,
    @Inject(UsersService)
    private readonly usersService: UsersService,
  ) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  async findAll(@Body() input: FindAllUsersDTO) {
    const result = await this.adminUsersService.findAll.execute(input);
    return result;
  }

  @Get('/:user_id')
  @HttpCode(HttpStatus.OK)
  async findById(@Param('user_id', ParseIntPipe) id: number) {
    const result = await this.usersService.findById.execute({ id });
    return result;
  }

  @Patch('/:user_id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Body() input: UpdateUserDTO,
    @Param('user_id', ParseIntPipe) id: number,
  ) {
    const result = await this.usersService.update.execute({
      ...input,
      id,
    });
    return result;
  }

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  async save(@Body() input: SaveUserDTO) {
    const result = await this.usersService.save.execute(input);
    return result;
  }
}
