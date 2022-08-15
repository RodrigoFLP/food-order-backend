import { Module } from '@nestjs/common';
import { StoresService } from './stores.service';
import { StoresController } from './stores.controller';
import { SchedulesController } from './schedules/schedules.controller';
import { AltSchedulesController } from './alt-schedules/alt-schedules.controller';
import { AltSchedulesService } from './alt-schedules/alt-schedules.service';
import { SchedulesService } from './schedules/schedules.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Store } from './entities/store.entity';
import { Schedule } from './entities/schedule.entity';
import { AltSchedule } from './entities/alt-schedule.entity';
import { AreasService } from './areas/areas.service';
import { CoordinatesService } from './coordinates/coordinates.service';
import { Area } from './entities/area.entity';
import { Coordinate } from './entities/coordinate.entity';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Store, Schedule, AltSchedule, Area, Coordinate]),
    ProductsModule,
  ],
  controllers: [StoresController, SchedulesController, AltSchedulesController],
  providers: [
    StoresService,
    AltSchedulesService,
    SchedulesService,
    AreasService,
    CoordinatesService,
  ],
  exports: [StoresService],
})
export class StoresModule {}
