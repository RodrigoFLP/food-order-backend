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

  async findOne(id: number) {
    const store = await this.storesRepo.findOne(+id, {
      relations: ['schedules', 'altSchedules'],
    });

    if (!store) {
      throw new NotFoundException(`store ${id} doesn't exist`);
    }
    return `This action returns a #${id} store`;
  }

  async update(id: number, changes: UpdateStoreDto) {
    const store = await this.storesRepo.findOne(+id);

    if (!store) {
      throw new NotFoundException(`store ${id} doesn't exist`);
    }

    this.storesRepo.merge(store, changes);
    return store;
  }

  async remove(id: number) {
    const store = await this.storesRepo.findOne(+id);

    if (!store) {
      throw new NotFoundException(`store ${id} doesn't exist`);
    }
    return this.storesRepo.delete(+id);
  }
}
