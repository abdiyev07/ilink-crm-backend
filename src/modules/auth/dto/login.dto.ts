import { IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsPhoneNumber('KZ')
  phone_number: string;

  @IsNotEmpty()
  password: string;
}
