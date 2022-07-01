import {
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateAddressDto {
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
  addressReference: string;

  @IsLatitude()
  @IsOptional()
  lat: number;

  @IsLongitude()
  @IsOptional()
  lon: number;

  @IsNumber()
  @IsOptional()
  customerId: string;
}
