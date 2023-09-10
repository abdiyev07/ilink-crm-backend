import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class GetClientsDto {
  @IsOptional()
  @IsNumberString()
  page: string;

  @IsOptional()
  @IsString()
  phoneNumber: string;
}
