import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Area } from '../entities/area.entity';
import { Store } from '../entities/store.entity';

@Injectable()
export class AreasService {
  constructor(
    @InjectRepository(Area) private readonly areasRepo: Repository<Area>,
  ) {}

  create(store: Store) {
    const area = this.areasRepo.create();
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
}
