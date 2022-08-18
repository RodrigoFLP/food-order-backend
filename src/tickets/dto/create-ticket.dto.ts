import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsDateString,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { CreateTicketItemDto } from './create-ticket-item.dto';

export class CreateTicketDto {
  @IsUUID()
  @IsOptional()
  customerAddressId: string | null;

  @IsInt()
  @IsOptional()
  couponId: string;

  @IsNumber()
  @IsOptional()
  statusId: number;

  @IsEnum(['delivery', 'pickup'])
  orderType: string;

  @IsEnum(['wompi', 'inplace'])
  paymentType: string;

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
