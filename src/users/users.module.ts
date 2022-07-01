import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { CustomersController } from './customers/customers.controller';
import { CustomersService } from './customers/customers.service';
import { AddressesController } from './addresses/addresses.controller';
import { AddressesService } from './addresses/addresses.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Customer } from './entities/customer.entity';
import { User } from './entities/user.entity';
import { Address } from './entities/address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Customer, Address])],
  controllers: [UsersController, CustomersController, AddressesController],
  providers: [UsersService, CustomersService, AddressesService],
  exports: [UsersService, CustomersService, AddressesService],
})
export class UsersModule {}
