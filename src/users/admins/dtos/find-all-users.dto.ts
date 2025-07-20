import { PartialType } from '@nestjs/mapped-types';
import { BaseQueryStringDTO } from '@shared/dtos/base-query-string.dto';

export class FindAllUsersDTO extends PartialType(BaseQueryStringDTO) {}
