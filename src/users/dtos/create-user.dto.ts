import { MinLength, MaxLength, IsString, IsEmail } from 'class-validator';

export class CreateUserDTO {
  @MinLength(3)
  @MaxLength(50)
  @IsString()
  name: string;

  @MinLength(5)
  @MaxLength(20)
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @MaxLength(50)
  @MinLength(8)
  @IsString()
  password: string;
}
