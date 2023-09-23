import { IsBoolean, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class AddClientDto {
  @IsString()
  @IsPhoneNumber()
  phone_number: string;

  @IsNotEmpty()
  @IsString()
  full_name: string;

  @IsNotEmpty()
  @IsString()
  processed_employee_name: string;

  @IsNotEmpty()
  @IsString()
  tariff_name: string;

  @IsOptional()
  @IsBoolean()
  has_tv: boolean;

  @IsNotEmpty()
  @IsString()
  address: string;
}
