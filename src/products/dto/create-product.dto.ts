import {
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Timestamp } from 'typeorm';

export class Portions {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsNumber()
  @IsPositive()
  price: number;
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
}

export class CreateProductDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsUrl()
  @IsString()
  image: string;

  @IsNumber()
  categoryId: number;

  @IsNumber()
  price: number;

  @IsDateString()
  lastUpdate: Timestamp;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => Portions)
  portions: Portions[];

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(0)
  @Type(() => Tags)
  tags?: Tags[];
}
