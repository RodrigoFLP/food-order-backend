import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddressesService } from '../addresses/addresses.service';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';
import { Address } from '../entities/address.entity';
import { Customer } from '../entities/customer.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
    private readonly addressesService: AddressesService,
  ) {}

  async create(data: CreateCustomerDto) {
    // first create customer to bind address
    const newCustomer = this.customerRepo.create(data);
    const createdCustomer = await this.customerRepo.save(newCustomer);

    // create address and bind to createdCustomer
    if (data.address) {
      await this.addressesService.create(data.address, createdCustomer);
    }

    return createdCustomer;
  }

  findAll() {
    return this.customerRepo.find({
      relations: ['user'],
      where: { user: { role: 'client' || 'customer' } },
    });
  }

  async findOne(id: number) {
    const customer = await this.customerRepo.findOne(id, {
      relations: ['user'],
    });
    if (!customer) {
      throw new NotFoundException(`customer doesn't exist`);
    }
    return this.customerRepo.findOne(id);
  }

  async update(id: number, data: UpdateCustomerDto) {
    const customer = await this.findOne(id);

    const updatedCustomer = this.customerRepo.merge(customer, data);
    return this.customerRepo.save(updatedCustomer);
  }

  remove(id: number) {
    return this.customerRepo.delete(id);
  }
}
