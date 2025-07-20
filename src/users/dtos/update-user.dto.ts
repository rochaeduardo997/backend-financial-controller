import { PartialType, OmitType } from '@nestjs/mapped-types';
import { SaveUserDTO } from '@users/dtos/save-user.dto';

export class UpdateUserDTO extends PartialType(
  OmitType(SaveUserDTO, ['password']),
) {}
