import { IsBoolean, IsDateString, IsInt, Max, Min } from 'class-validator';

export class UpdateScheduleBatch {
  @IsInt()
  id: number;

  @IsInt()
  @Max(7)
  @Min(1)
  dayOfWeek: number;

  @IsDateString()
  openTime: Date;

  @IsDateString()
  closeTime: Date;

  @IsBoolean()
  isActive: boolean;

  @IsBoolean()
  create: boolean;

  @IsBoolean()
  update: boolean;

  @IsBoolean()
  delete: boolean;
}
