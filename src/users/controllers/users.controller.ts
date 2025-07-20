import { Response } from 'express';

import {
  Body,
  Catch,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
// import { IsPublic } from '@shared/decorators/is-public.decorator';
import { UsersService } from '@users/services/users.service';
import { SaveUserDTO } from '@users/dtos/save-user.dto';
import { UpdateUserDTO } from '@users/dtos/update-user.dto';
import { AuthGuard } from '@shared/guards/auth.guard';

@Controller('users')
@Catch()
@UseGuards(AuthGuard)
export class UsersController {
  constructor(
    @Inject(UsersService)
    private readonly usersService: UsersService,
  ) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  // @IsPublic()
  async save(@Body() input: SaveUserDTO) {
    const result = await this.usersService.save.execute(input);
    return result;
  }

  @Get('/me')
  @HttpCode(HttpStatus.OK)
  async findById(@Request() req: Request) {
    const id = req.user?.id;
    const result = await this.usersService.findById.execute({ id: +id! });
    return result;
  }

  @Patch('/me')
  @HttpCode(HttpStatus.OK)
  async update(@Request() req: Request, @Body() input: UpdateUserDTO) {
    const id = req.user?.id;
    const result = await this.usersService.update.execute({
      ...input,
      id: +id!,
    });
    return result;
  }
}
