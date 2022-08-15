import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PrimaryColumn, Timestamp } from 'typeorm';

export class TagGroup {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsArray()
  @IsOptional()
  @ArrayMinSize(1)
  portions: number[];

  @IsString()
  @IsOptional()
  color: string;

  @IsInt()
  @Min(0)
  max: number;

  @IsInt()
  @Min(0)
  min: number;

  @IsBoolean()
  hidden: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => Tags)
  tags: Tags[];
}

export class Portions {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @ArrayMinSize(0)
  @Type(() => TagGroup)
  tagGroups: TagGroup[];
}

export class Tags {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  value: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  ratio: number;
}

export class CreateProductDto {
  @PrimaryColumn()
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsUrl()
  @IsString()
  image: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsNotEmpty()
  categoriesId: number[];

  @IsArray()
  tagsCategoriesId: number[];

  @IsNumber()
  @Min(0)
  price: number;

  @IsDateString()
  @IsOptional()
  lastUpdate: Timestamp;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(0)
  @Type(() => TagGroup)
  portionsTagGroups: TagGroup[];

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
