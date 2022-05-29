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
  customerAddressId: number;

  @IsInt()
  @IsOptional()
  couponId: string;

  @IsNumber()
  @IsOptional()
  statusId: number;

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
