import { IsNumberString, IsOptional, IsPhoneNumber } from 'class-validator';

export class GetUsersDto {
  @IsOptional()
  @IsPhoneNumber('KZ')
  phone: string;

  @IsOptional()
  @IsNumberString()
  code: string;

  @IsOptional()
  @IsNumberString()
  bin: string;

  @IsOptional()
  @IsNumberString()
  license: string;

  @IsOptional()
  @IsNumberString()
  id: string;
}
