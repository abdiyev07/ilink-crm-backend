import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class GetOrdersDto {
  @IsOptional()
  @IsNumberString()
  page: string;

  @IsOptional()
  @IsNumberString()
  orderId: string;

  @IsOptional()
  @IsString()
  phoneNumber: string;
}
