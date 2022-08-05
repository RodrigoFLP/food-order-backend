import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Status } from '../entities/status.entity';
import { Ticket } from '../entities/ticket.entity';
import { StatusType } from '../models/status.model';

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

  async update(id: number, step: string) {
    const status = await this.findOne(id);

    if (step === StatusType.DELIVERED) {
      status.orderReceived = new Date(Date.now());
    }

    if (step === StatusType.PREPARED) {
      status.orderReceived = null;
      status.orderPrepared = new Date(Date.now());
    }

    if (step === StatusType.CONFIRMED) {
      status.orderReceived = null;
      status.orderPrepared = null;
      status.orderConfirmed = new Date(Date.now());
    }

    if (step === StatusType.PAID) {
      status.orderReceived = null;
      status.orderPrepared = null;
      status.orderConfirmed = null;
      status.orderPaid = new Date(Date.now());
    }

    if (step === StatusType.PLACED) {
      status.orderReceived = null;
      status.orderPrepared = null;
      status.orderConfirmed = null;
      status.orderPaid = null;
      status.orderPlaced = new Date(Date.now());
    }

    return this.statusRepository.save(status);
  }

  remove(id: number) {
    return this.statusRepository.delete(id);
  }
}
