import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsService } from '../products/products.service';
import { AddressesService } from '../users/addresses/addresses.service';
import { CustomersService } from '../users/customers/customers.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket } from './entities/ticket.entity';
import { TicketItem } from './entities/ticketItem.entity';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(TicketItem)
    private readonly ticketItemsRepo: Repository<TicketItem>,
    @InjectRepository(Ticket) private readonly ticketsRepo: Repository<Ticket>,
    private readonly customerService: CustomersService,
    private readonly addressService: AddressesService,
    private readonly productService: ProductsService,
  ) {}

  async create(data: CreateTicketDto) {
    //create Ticket
    const newTicket = this.ticketsRepo.create(data);
    const customer = await this.customerService.findOne(data.customerId);
    if (!customer) {
      throw new NotFoundException(`user doesn't exist`);
    }
    const address = await this.addressService.findOne(data.customerAddressId);
    if (!address) {
      throw new NotFoundException(`address doesn't exist`);
    }

    newTicket.customer = customer;
    newTicket.address = address;

    await this.ticketsRepo.save(newTicket);

    let total = 0;

    // add ticketItems and bind each one to ticket
    for await (const item of data.ticketItems) {
      this.ticketItemsRepo.create(item);
      const product = await this.productService.findOne(item.productId);

      const newTicketItem = this.ticketItemsRepo.create(item);
      newTicketItem.product = product;
      newTicketItem.ticket = newTicket;

      const portion = product.portions.find(
        (portion) => portion.name === item.portion.name,
      );

      if (!portion) {
        throw new NotFoundException(`Portion not found`);
      }

      newTicketItem.totalAmount = portion.price;

      for await (const tag of item.tags) {
        const tagGroup = portion.tagGroups.find(
          (tagGroup) => tagGroup.name === tag.name,
        );
        if (!tagGroup) {
          throw new NotFoundException(
            `Portion of ${tag.name} not found in product portions`,
          );
        }
        console.log(tagGroup.tags);
        const nTag = tagGroup.tags.find((nTag) => nTag.value === tag.value);
        if (!nTag) {
          throw new NotFoundException(
            `tag ${tag.value} not found in portion tags`,
          );
        }
        newTicketItem.totalAmount =
          newTicketItem.totalAmount + nTag.price * tag.quantity;
      }

      newTicketItem.totalAmount = newTicketItem.totalAmount * item.quantity;
      total = total + newTicketItem.totalAmount;
      console.log(total);
      this.ticketItemsRepo.save(newTicketItem);
    }

    newTicket.totalAmount = total;
    console.log(newTicket.totalAmount);

    await this.ticketsRepo.save(newTicket);
    return newTicket;
  }

  findAll() {
    return this.ticketsRepo.find();
  }

  async findOne(id: number) {
    const ticketWithItemsAndProducts = await this.ticketsRepo
      .createQueryBuilder('tickets')
      .innerJoinAndSelect('tickets.ticketItems', 'ticketItems')
      .innerJoinAndSelect('ticketItems.product', 'product.id')
      .where('tickets.id = :id', { id })
      .getOne();
    return ticketWithItemsAndProducts;
  }

  update(id: number, updateTicketDto: UpdateTicketDto) {
    return `This action updates a #${id} ticket`;
  }

  remove(id: number) {
    return this.ticketsRepo.delete(id);
  }

  ordersByCustomer(customerId: number) {
    return this.ticketsRepo.find({
      where: {
        customer: customerId,
      },
    });
  }
}
