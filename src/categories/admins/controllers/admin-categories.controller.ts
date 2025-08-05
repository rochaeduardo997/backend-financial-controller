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
import { AdminCategoriesService } from '@categories/admins/services/admins.service';
import { FindAllCategoriesDTO } from '@categories/admins/dtos/find-all-categories.dto';
import { AdminSaveCategoryDTO } from '@categories/admins/dtos/save-category.dto';
import { AdminUpdateCategoryDTO } from '@categories/admins/dtos/update-category.dto';

@Controller('admin/categories')
@Catch()
@UseGuards(AuthGuard)
export class AdminCategoriesController {
  constructor(
    @Inject(AdminCategoriesService)
    private readonly adminCategoriesService: AdminCategoriesService,
  ) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  async findAll(@Body() input: FindAllCategoriesDTO) {
    const result = await this.adminCategoriesService.findAll.execute(input);
    return result;
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async findById(@Param('id', ParseIntPipe) id: number) {
    const result = await this.adminCategoriesService.findById.execute({ id });
    return result;
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Body() input: AdminUpdateCategoryDTO,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const result = await this.adminCategoriesService.update.execute({
      ...input,
      id,
    });
    return result;
  }

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  async save(@Body() input: AdminSaveCategoryDTO) {
    const result = await this.adminCategoriesService.save.execute(input);
    return result;
  }
}
