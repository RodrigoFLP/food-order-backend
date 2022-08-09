import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAreaDto } from '../dto/create-area.dto';
import { Area } from '../entities/area.entity';
import { Store } from '../entities/store.entity';

@Injectable()
export class AreasService {
  constructor(
    @InjectRepository(Area) private readonly areasRepo: Repository<Area>,
  ) {}

  create(store: Store, newArea: CreateAreaDto) {
    const area = this.areasRepo.create(newArea);
    area.store = store;
    area.isActive = true;

    return this.areasRepo.save(area);
  }

  findByStoreId(id: number) {
    const areas = this.areasRepo.find({
      where: { store: id },
      relations: ['coordinates'],
    });

    return areas;
  }

  delete(id: number) {
    return this.areasRepo.delete(id);
  }
}
