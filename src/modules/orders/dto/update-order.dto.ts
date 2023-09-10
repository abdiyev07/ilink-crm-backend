import { IsBoolean, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class UpdateOrderDto {
  @IsOptional()
  @IsString()
  @IsPhoneNumber()
  contact_phone_number: string;

  @IsOptional()
  @IsString()
  work_type: string;

  @IsOptional()
  @IsString()
  client_type: string;

  @IsOptional()
  @IsString()
  status: string;

  @IsOptional()
  @IsString()
  csi: string;

  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @IsBoolean()
  is_free: boolean;

  @IsOptional()
  @IsString()
  breakdown_reason: string;

  @IsOptional()
  @IsString()
  executors: string;

  @IsOptional()
  @IsString()
  activation_at: string;

  @IsOptional()
  @IsString()
  fixed_at: Date;
}
