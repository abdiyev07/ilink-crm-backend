import { IsBoolean, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class AddOrderDto {
  @IsString()
  @IsPhoneNumber()
  contact_phone_number: string;

  @IsNotEmpty()
  @IsString()
  work_type: string;

  @IsNotEmpty()
  @IsString()
  client_type: string;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsNotEmpty()
  @IsString()
  executors: string;

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
  activation_at: string;

  @IsOptional()
  @IsString()
  fixed_at: string;

  @IsOptional()
  @IsString()
  client_uid: string;

  @IsOptional()
  @IsString()
  sub_provider: string;
}
