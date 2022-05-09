import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTicketItemDto } from '../dto/create-ticket-item.dto';
import { UpdateTicketItemDto } from '../dto/update-ticket-item.dto';
import { TicketItem } from '../entities/ticketItem.entity';

@Injectable()
export class TicketItemsService {
  constructor(
    @InjectRepository(TicketItem)
    private ticketItemRepo: Repository<TicketItem>,
  ) {}
  create(data: CreateTicketItemDto) {
    return 'This action adds a new ticket-item';
  }
  findAll() {
    return this.ticketItemRepo.find({ relations: ['product'] });
  }
  findOne(id: number) {
    return this.ticketItemRepo.findOne(id, { relations: ['product'] });
  }
  // update(id: number, updateTicketItemsDto: UpdateTicketItemDto) {
  //   return `This action updates a #id ticket-item`;
  // }
  // remove(id: number) {
  //   return `This action removes a #id ticket-item`;
  // }
}
