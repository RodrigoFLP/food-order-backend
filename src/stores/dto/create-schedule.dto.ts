import { IsDateString, IsInt, Max, Min } from 'class-validator';

export class CreateScheduleDto {
  @IsInt()
  @Max(7)
  @Min(1)
  dayOfWeek: number;

  @IsDateString()
  openTime: Date;

  @IsDateString()
  closeTime: Date;

  @IsInt()
  @Min(0)
  storeId: number;
}
