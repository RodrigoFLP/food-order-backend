import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { StoresService } from './stores.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/models/roles.model';
import { Public } from '../auth/decorators/public.decorator';
import { AreasService } from './areas/areas.service';
import { CoordinatesService } from './coordinates/coordinates.service';
import { CreateAreaDto } from './dto/create-area.dto';
import { SchedulesService } from './schedules/schedules.service';
import { UpdateScheduleBatch } from './dto/update-schedule-batch.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('stores')
export class StoresController {
  constructor(
    private readonly storesService: StoresService,
    private readonly areasService: AreasService,
    private readonly coordinatesService: CoordinatesService,
    private readonly schedulesService: SchedulesService,
  ) {}

  @Roles(Role.ADMIN, Role.SUPERADMIN)
  @Post()
  create(@Body() createStoreDto: CreateStoreDto) {
    return this.storesService.create(createStoreDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.storesService.findAll();
  }

  @Roles(Role.ADMIN, Role.SUPERADMIN)
  @Patch('schedule')
  async updateSchedule(@Body() mutations: UpdateScheduleBatch[]) {
    const toUpdate = mutations.filter((mutation) => mutation.update);
    const toCreate = mutations.filter((mutation) => mutation.create);
    const toRemove = mutations.filter((mutation) => mutation.delete);

    for await (const update of toUpdate) {
      await this.schedulesService.update(update.id, {
        closeTime: update.closeTime,
        openTime: update.openTime,
        dayOfWeek: update.dayOfWeek,
        isActive: update.isActive,
        storeId: 1,
      });
    }

    for await (const create of toCreate) {
      await this.schedulesService.create({
        closeTime: create.closeTime,
        openTime: create.openTime,
        dayOfWeek: create.dayOfWeek,
        isActive: create.isActive,
        storeId: 1,
      });
    }

    for await (const remove of toRemove) {
      await this.schedulesService.remove(remove.id);
    }

    return { message: 'Succesful' };
  }

  @Public()
  @Get('is-open')
  IsOpen() {
    return this.storesService.isOpen();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storesService.findOne(+id);
  }

  @Roles(Role.ADMIN, Role.SUPERADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStoreDto: UpdateStoreDto) {
    return this.storesService.update(+id, updateStoreDto);
  }

  @Roles(Role.ADMIN, Role.SUPERADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storesService.remove(+id);
  }

  @Roles(Role.ADMIN, Role.SUPERADMIN)
  @Post(':id/area')
  async createArea(
    @Param('id') id: string,
    @Body() createAreaDto: CreateAreaDto,
  ) {
    const store = await this.storesService.findOne(+id);
    const newArea = await this.areasService.create(store, createAreaDto);

    for await (const coordinate of createAreaDto.coordinates) {
      await this.coordinatesService.create(newArea, coordinate);
    }

    return newArea;
  }

  @Delete(':id/area/:areaId')
  async deleteArea(@Param('id') id: string, @Param('areaId') areaId: string) {
    const store = await this.storesService.findOne(+id);
    return this.areasService.delete(+areaId);
  }

  @Public()
  @Get(':id/area')
  async getArea(@Param('id') id: string) {
    const store = await this.areasService.findByStoreId(+id);

    return store;
  }
}
