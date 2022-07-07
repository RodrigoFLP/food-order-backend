import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Status } from '../entities/status.entity';
import { Ticket } from '../entities/ticket.entity';

@Injectable()
export class StatusService {
  constructor(
    @InjectRepository(Status) private statusRepository: Repository<Status>,
  ) {}

  create() {
    const newStatus = this.statusRepository.create();
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

  // async update(id: number, updateStatusDto: UpdateStatusDto) {
  //   const status = await this.findOne(id);
  //   this.statusRepository.merge(status, updateStatusDto);
  //   return this.statusRepository.create(status);
  // }

  remove(id: number) {
    return this.statusRepository.delete(id);
  }
}
