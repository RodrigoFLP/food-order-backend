import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { Roles } from '../../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Role } from '../../auth/models/roles.model';
import { CreateAltScheduleDto } from '../dto/create-alt-schedule.dto';
import { UpdateAltScheduleDto } from '../dto/update-alt-schedule.dto';
import { AltSchedulesService } from './alt-schedules.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('alt-schedules')
export class AltSchedulesController {
  constructor(private readonly schedulesService: AltSchedulesService) {}

  @Roles(Role.ADMIN, Role.SUPERADMIN)
  @Post()
  create(@Body() createAltScheduleDto: CreateAltScheduleDto) {
    return this.schedulesService.create(createAltScheduleDto);
  }

  @Roles(Role.ADMIN, Role.SUPERADMIN)
  @Get()
  findAll() {
    return this.schedulesService.findAll();
  }

  @Roles(Role.ADMIN, Role.SUPERADMIN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.schedulesService.findOne(+id);
  }

  @Roles(Role.ADMIN, Role.SUPERADMIN)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAltScheduleDto: UpdateAltScheduleDto,
  ) {
    return this.schedulesService.update(+id, updateAltScheduleDto);
  }

  @Roles(Role.ADMIN, Role.SUPERADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.schedulesService.remove(+id);
  }
}
