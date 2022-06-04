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

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('stores')
export class StoresController {
  constructor(
    private readonly storesService: StoresService,
    private readonly areasService: AreasService,
    private readonly coordinatesService: CoordinatesService,
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
    const newArea = await this.areasService.create(store);

    for await (const coordinate of createAreaDto.coordinates) {
      await this.coordinatesService.create(newArea, coordinate);
    }

    return newArea;
  }

  @Public()
  @Get(':id/area')
  async getArea(@Param('id') id: string) {
    const store = await this.areasService.findByStoreId(+id);

    return store;
  }
}
