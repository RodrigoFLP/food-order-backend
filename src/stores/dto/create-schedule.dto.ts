import { IsDateString, IsInt, Max, Min } from 'class-validator';

export class CreateScheduleDto {
  @IsInt()
  @Max(7)
  @Min(1)
  dayOfWeek: number;

  @IsDateString()
  OpenTime: Date;

  @IsDateString()
  CloseTime: Date;

  @IsInt()
  @Min(0)
  storeId: number;
}
