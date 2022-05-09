import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsOptional,
  IsPositive,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { PrimaryGeneratedColumn } from 'typeorm';
import { Portion, Tag } from '../../products/entities/product.entity';

export class CreateTicketItemDto {
  @PrimaryGeneratedColumn()
  id: number;

  @IsInt()
  @IsPositive()
  quantity: number;

  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested({ each: true })
  @Type(() => Portion)
  portion: Portion;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Tags)
  tags: Tags[];

  @IsNumber()
  @Min(0)
  totalAmount: number;

  @IsInt()
  productId: number;

  @IsInt()
  @IsOptional()
  ticketId: number;
}

export class Tags {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsString()
  value: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsNumber()
  ratio: number;

  @IsNumber()
  @IsPositive()
  quantity: number;
}
