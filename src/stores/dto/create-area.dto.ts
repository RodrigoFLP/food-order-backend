import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, ValidateNested } from 'class-validator';
import { CreateCoordinateDto } from './create-coordinate.dto';

export class CreateAreaDto {
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(0)
  @Type(() => CreateCoordinateDto)
  coordinates: CreateCoordinateDto[];
}
