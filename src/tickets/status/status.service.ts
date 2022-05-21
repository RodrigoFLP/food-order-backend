import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStatusDto } from '../dto/create-status.dto';
import { UpdateStatusDto } from '../dto/update-status.dto';
import { Status } from '../entities/status.entity';

@Injectable()
export class StatusService {
  constructor(
    @InjectRepository(Status) private statusRepository: Repository<Status>,
  ) {}

  create(data: CreateStatusDto) {
    const newStatus = this.statusRepository.create(data);

    return this.statusRepository.save(newStatus);
  }

  findAll() {
    return this.statusRepository.find();
  }

  async findOne(id: number) {
    const status = await this.statusRepository.findOne(id);

    if (!status) {
      throw new NotFoundException(`status id:${id} doesn't exist`);
    }
    return status;
  }

  async update(id: number, updateStatusDto: UpdateStatusDto) {
    const status = await this.findOne(id);
    this.statusRepository.merge(status, updateStatusDto);
    return this.statusRepository.create(status);
  }

  remove(id: number) {
    return this.statusRepository.delete(id);
  }
}
