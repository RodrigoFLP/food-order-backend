import { IsDateString, IsInt, Max, Min } from 'class-validator';

export class CreateAltScheduleDto {
  @IsInt()
  @Max(7)
  @Min(1)
  dayOfWeek: number;

  @IsDateString()
  overrideStartDate: Date;

  @IsDateString()
  overrideEndDate: Date;

  @IsDateString()
  altOpenTime: Date;

  @IsDateString()
  altCloseTime: Date;

  @IsInt()
  @Min(0)
  storeId: number;
}
