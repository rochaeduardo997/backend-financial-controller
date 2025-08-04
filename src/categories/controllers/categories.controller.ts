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
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@shared/guards/auth.guard';
import { CategoriesService } from '@categories/services/categories.service';
import { SaveCategoryDTO } from '@categories/dtos/save-category.dto';
import { UpdateCategoryDTO } from '@categories/dtos/update-category.dto';

@Controller('categories')
@Catch()
@UseGuards(AuthGuard)
export class CategoriesController {
  constructor(
    @Inject(CategoriesService)
    private readonly categoriesService: CategoriesService,
  ) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  async save(@Request() req: Request, @Body() input: SaveCategoryDTO) {
    const userId = req.user?.id;
    const result = await this.categoriesService.save.execute({
      ...input,
      userId: +userId!,
    });
    return result;
  }

  @Get('/')
  @HttpCode(HttpStatus.OK)
  async findAll(@Request() req: Request) {
    const userId = req.user?.id;
    const result = await this.categoriesService.findAll.execute({
      userId: +userId!,
    });
    return result;
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async findById(
    @Request() req: Request,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const userId = req.user?.id;
    const result = await this.categoriesService.findById.execute({
      userId: +userId!,
      id,
    });
    return result;
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Request() req: Request,
    @Body() input: UpdateCategoryDTO,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const userId = req.user?.id;
    const result = await this.categoriesService.update.execute({
      ...input,
      userId: +userId!,
      id,
    });
    return result;
  }
}
