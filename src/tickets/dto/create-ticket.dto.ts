import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsDateString,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateTicketItemDto } from './create-ticket-item.dto';

export class CreateTicketDto {
  @IsInt()
  customerId: number;

  @IsInt()
  customerAddressId: number;

  @IsInt()
  @IsOptional()
  couponId: string;

  @IsNumber()
  totalAmount: number;

  @IsString()
  @IsOptional()
  status: string;

  @IsString()
  orderType: string;

  @IsDateString()
  @IsOptional()
  scheduledDate?: Date;

  @IsInt()
  storeId: number;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateTicketItemDto)
  ticketItems: CreateTicketItemDto[];
}
