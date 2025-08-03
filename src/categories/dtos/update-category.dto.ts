/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { PartialType } from '@nestjs/mapped-types';
import { SaveCategoryDTO } from '@categories/dtos/save-category.dto';

export class UpdateCategoryDTO extends PartialType(SaveCategoryDTO) {}
