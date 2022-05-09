import { PartialType } from '@nestjs/mapped-types';
import { CreateAltScheduleDto } from './create-alt-schedule.dto';

export class UpdateAltScheduleDto extends PartialType(CreateAltScheduleDto) {}
