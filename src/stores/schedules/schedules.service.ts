import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateScheduleDto } from '../dto/create-schedule.dto';
import { UpdateScheduleDto } from '../dto/update-schedule.dto';
import { Schedule } from '../entities/schedule.entity';
import { Store } from '../entities/store.entity';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
    @InjectRepository(Store)
    private storeRepository: Repository<Store>,
  ) {}

  async create(data: CreateScheduleDto) {
    const store = await this.storeRepository.findOne(data.storeId);
    if (!store) {
      throw new NotFoundException(`store ${data.storeId} doesn't exist`);
    }
    const newSchedule = this.scheduleRepository.create(data);
    newSchedule.store = store;
    return this.scheduleRepository.save(newSchedule);
  }

  findAll() {
    return this.scheduleRepository.find();
  }

  findAllByStoreId(id: number) {
    return this.scheduleRepository.find({ where: { store: { id } } });
  }

  async findOne(id: number) {
    const schedule = await this.scheduleRepository.findOne(id);
    if (!schedule) {
      throw new NotFoundException(`schedule ${id} doesn't exist`);
    }
    return schedule;
  }

  async update(id: number, changes: UpdateScheduleDto) {
    const schedule = await this.scheduleRepository.findOne(id);
    if (!schedule) {
      throw new NotFoundException(`schedule ${id} doesn't exist`);
    }
    this.scheduleRepository.merge(schedule, changes);
    return this.scheduleRepository.save(schedule);
  }

  async remove(id: number) {
    const schedule = await this.scheduleRepository.findOne(id);
    if (!schedule) {
      throw new NotFoundException(`schedule ${id} doesn't exist`);
    }
    return this.scheduleRepository.delete(id);
  }
}
