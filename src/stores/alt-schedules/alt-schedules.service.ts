import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAltScheduleDto } from '../dto/create-alt-schedule.dto';
import { UpdateAltScheduleDto } from '../dto/update-alt-schedule.dto';
import { AltSchedule } from '../entities/alt-schedule.entity';
import { Store } from '../entities/store.entity';

@Injectable()
export class AltSchedulesService {
  constructor(
    @InjectRepository(AltSchedule)
    private altScheduleRepository: Repository<AltSchedule>,
    @InjectRepository(Store)
    private storeRepository: Repository<Store>,
  ) {}

  async create(data: CreateAltScheduleDto) {
    const store = await this.storeRepository.findOne(data.storeId);
    if (!store) {
      throw new NotFoundException(`store ${data.storeId} doesn't exist`);
    }
    const newAltSchedule = this.altScheduleRepository.create(data);
    newAltSchedule.store = store;
    return this.altScheduleRepository.save(newAltSchedule);
  }

  findAll() {
    return this.altScheduleRepository.find();
  }

  async findOne(id: number) {
    const altSchedule = await this.altScheduleRepository.findOne(id);
    if (!altSchedule) {
      throw new NotFoundException(`altSchedule ${id} doesn't exist`);
    }
    return altSchedule;
  }

  async update(id: number, changes: UpdateAltScheduleDto) {
    const altSchedule = await this.altScheduleRepository.findOne(id);
    if (!altSchedule) {
      throw new NotFoundException(`altSchedule ${id} doesn't exist`);
    }
    this.altScheduleRepository.merge(altSchedule, changes);
    return this.altScheduleRepository.save(altSchedule);
  }

  async remove(id: number) {
    const altSchedule = await this.altScheduleRepository.findOne(id);
    if (!altSchedule) {
      throw new NotFoundException(`altSchedule ${id} doesn't exist`);
    }
    return this.altScheduleRepository.delete(id);
  }
}
