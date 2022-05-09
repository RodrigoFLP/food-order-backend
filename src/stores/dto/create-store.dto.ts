import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateStoreDto {
  @IsString()
  name: string;

  @IsString()
  state: string;

  @IsString()
  city: string;

  @IsString()
  addressLine1: string;

  @IsString()
  @IsOptional()
  addressLine2: string;

  @IsString()
  @IsOptional()
  addressReference: string;

  @IsString()
  phoneNumber: string;

  @IsBoolean()
  isDeliveryEnabled: boolean;

  @IsBoolean()
  isPickupEnabled: boolean;

  @IsBoolean()
  isSchedulingEnabled: boolean;

  @IsBoolean()
  @IsOptional()
  productException: boolean;
}
