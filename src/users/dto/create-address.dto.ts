import { IsNumber, IsOptional, IsString } from 'class-validator';

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

  @IsString()
  coordinates: string;

  @IsNumber()
  @IsOptional()
  customerId: string;
}
