import { IsBoolean, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class UpdateClientDto {
  @IsOptional()
  @IsPhoneNumber()
  phone_number: string;

  @IsOptional()
  @IsString()
  full_name: string;

  @IsOptional()
  @IsString()
  processed_employee_name: string;

  @IsOptional()
  @IsString()
  tariff_name: string;

  @IsOptional()
  @IsBoolean()
  has_tv: boolean;

  @IsOptional()
  @IsString()
  address: string;
}
