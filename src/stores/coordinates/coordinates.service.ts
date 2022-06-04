import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCoordinateDto } from '../dto/create-coordinate.dto';
import { Area } from '../entities/area.entity';
import { Coordinate } from '../entities/coordinate.entity';

@Injectable()
export class CoordinatesService {
  constructor(
    @InjectRepository(Coordinate)
    private readonly coordinatesRepo: Repository<Coordinate>,
  ) {}

  create(area: Area, coordinate: CreateCoordinateDto) {
    const newPoint = this.coordinatesRepo.create(coordinate);
    newPoint.area = area;
    return this.coordinatesRepo.save(newPoint);
  }

  findAll() {
    return this.coordinatesRepo.find({ relations: ['area'] });
  }
}
