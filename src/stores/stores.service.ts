import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Store } from './entities/store.entity';

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(Store) private readonly storesRepo: Repository<Store>,
  ) {}

  create(createStoreDto: CreateStoreDto) {
    const newStore = this.storesRepo.create(createStoreDto);

    return this.storesRepo.save(newStore);
  }

  async findAll() {
    const stores = await this.storesRepo.find();
    return stores;
  }

  checkDate(from: Date, to: Date, check: Date): boolean {
    const fromHour = from.getHours();
    const fromMinute = from.getMinutes();

    const toHour = to.getHours();
    const toMinute = to.getMinutes();

    const checkHour = check.getHours();
    const checkMinute = check.getMinutes();

    const start = fromHour * 60 + fromMinute;
    const end = toHour * 60 + toMinute;
    const now = checkHour * 60 + checkMinute;

    if (start < end && start <= now && now <= end) return true;

    if (start < end) return false;

    if (start > end && (start <= now || now <= end)) return true;

    return false;
  }

  async isOpen() {
    const { schedules } = await this.storesRepo.findOne(1, {
      relations: ['schedules'],
    });

    const currentDay = new Date(Date.now()).getDay();

    const filteredSchedules = schedules.filter(
      (schedule) => schedule.dayOfWeek === currentDay,
    );

    const isOpen = filteredSchedules.some(
      ({ openTime, closeTime, isActive }) =>
        this.checkDate(openTime, closeTime, new Date()) && isActive,
    );

    return { isOpen };
  }

  async findOne(id: number) {
    const store = await this.storesRepo.findOne(+id, {
      relations: ['schedules', 'altSchedules', 'areas'],
    });

    if (!store) {
      throw new NotFoundException(`store ${id} doesn't exist`);
    }
    return store;
  }

  async update(id: number, changes: UpdateStoreDto) {
    const store = await this.storesRepo.findOne(+id);

    if (!store) {
      throw new NotFoundException(`store ${id} doesn't exist`);
    }

    this.storesRepo.merge(store, changes);
    return this.storesRepo.save(store);
  }

  async remove(id: number) {
    const store = await this.storesRepo.findOne(+id);

    if (!store) {
      throw new NotFoundException(`store ${id} doesn't exist`);
    }
    return this.storesRepo.delete(+id);
  }
}
