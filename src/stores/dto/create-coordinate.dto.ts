import { IsLatitude, IsLongitude } from 'class-validator';

export class CreateCoordinateDto {
  @IsLatitude()
  lat: number;

  @IsLongitude()
  lon: number;
}
