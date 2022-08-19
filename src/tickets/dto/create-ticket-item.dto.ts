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

export class Tags {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  value: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  price: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  ratio: number;

  @IsNumber()
  @Min(0)
  quantity: number;
}

export class TagsGroups {
  @IsString()
  name: string;

  @IsNumber()
  @Min(0)
  quantity: number;

  @IsNumber()
  @IsOptional()
  max: number;

  @IsNumber()
  @IsOptional()
  min: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Tags)
  tags: Tags[];
}

export class Portion {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsNumber()
  price: number;
}
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
  @Type(() => TagsGroups)
  tagsGroups: TagsGroups[];

  @IsNumber()
  @Min(0)
  @IsOptional()
  totalAmount: number;

  @IsInt()
  productId: number;

  @IsInt()
  @IsOptional()
  ticketId: number;
}
