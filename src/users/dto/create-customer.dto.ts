import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsDateString,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';

import { CreateAddressDto } from './create-address.dto';

export class CreateCustomerDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  phoneNumber: string;

  @IsDateString()
  birthDate: Date;

  @IsBoolean()
  receiveAds: boolean;

  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;
}
