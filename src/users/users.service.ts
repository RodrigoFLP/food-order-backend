import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomersService } from './customers/customers.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly customerService: CustomersService,
  ) {}

  async create(data: CreateUserDto) {
    const existsEmail = !!(await this.findByEmail(data.email));

    if (existsEmail) {
      throw new NotAcceptableException('Email already exists');
    }

    const newUser = this.userRepository.create(data);

    const hashPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashPassword;
    if (data.customer) {
      const customer = await this.customerService.create(data.customer);
      newUser.customer = customer;
    }

    newUser.role = 'customer';

    return this.userRepository.save(newUser);
  }

  findAll() {
    return this.userRepository.find();
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    return user;
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne(id, {
      relations: ['customer'],
    });
    if (!user) {
      throw new NotFoundException(`user ${id} doesn't exist`);
    }
    return user;
  }

  async update(id: number, changes: UpdateUserDto) {
    const user = await this.findOne(id);

    this.userRepository.merge(user, changes);

    return this.userRepository.save(user);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
