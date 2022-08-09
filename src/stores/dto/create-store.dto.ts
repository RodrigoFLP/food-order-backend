import {
  IsBoolean,
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

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

  @IsLatitude()
  lat: number;

  @IsLongitude()
  lon: number;

  @IsBoolean()
  isDeliveryEnabled: boolean;

  @IsBoolean()
  isPickupEnabled: boolean;

  @IsBoolean()
  isSchedulingEnabled: boolean;

  @IsBoolean()
  isTaxEnabled: boolean;

  @IsBoolean()
  isCashPaymentEnabled: boolean;

  @IsBoolean()
  isWompiPaymentEnabled: boolean;

  @IsBoolean()
  isDeliveryCostEnabled: boolean;

  @IsNumber()
  deliveryCost: number;

  @IsNumber()
  deliveryMin: number;

  @IsString()
  whatsappNumber: string;

  @IsString()
  facebook: string;

  @IsString()
  instagram: string;

  @IsBoolean()
  @IsOptional()
  productException: boolean;
}
