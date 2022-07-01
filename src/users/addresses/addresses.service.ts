import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAddressDto } from '../dto/create-address.dto';
import { UpdateAddressDto } from '../dto/update-address.dto';
import { Address } from '../entities/address.entity';
import { Customer } from '../entities/customer.entity';

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(Address) private addressRepository: Repository<Address>,
  ) {}

  create(data: CreateAddressDto, customer: Customer) {
    const newAddress = this.addressRepository.create(data);
    newAddress.customer = customer;
    return this.addressRepository.save(newAddress);
  }

  findAll() {
    return this.addressRepository.find({ relations: ['customer'] });
  }

  findOne(id: string) {
    const address = this.addressRepository.findOne(id);
    if (!address) {
      throw new NotFoundException(`address doesn't exist`);
    }
    return this.addressRepository.findOne(id);
  }

  async update(id: string, data: UpdateAddressDto) {
    const updatedAddress = await this.addressRepository.findOne(id);

    this.addressRepository.merge(updatedAddress, data);

    return this.addressRepository.save(updatedAddress);
  }

  remove(id: string) {
    return this.addressRepository.delete(id);
  }

  findManyByCustomerId(id: number) {
    return this.addressRepository.find({ where: { customer: id } });
  }
}
