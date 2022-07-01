import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { PayloadToken } from '../auth/models/token.model';
import { TicketsService } from '../tickets/tickets.service';
import { CustomersService } from '../users/customers/customers.service';
import { UsersService } from '../users/users.service';
import { Public } from '../auth/decorators/public.decorator';
import { AddressesService } from '../users/addresses/addresses.service';
import { CreateAddressDto } from '../users/dto/create-address.dto';
import { UpdateAddressDto } from '../users/dto/update-address.dto';
import { IsUUID, UUIDVersion } from 'class-validator';
import { OrderIdDto } from '../tickets/dto/order-id.dto';

@Controller('profile')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProfileController {
  constructor(
    private ticketsService: TicketsService,
    private customersService: CustomersService,
    private usersService: UsersService,
    private addressService: AddressesService,
  ) {}

  @Get()
  async getProfile(@Req() req: Request) {
    const user = req.user as PayloadToken;

    const customer = await this.usersService.findCustomer(user.sub);
    const orders = await this.ticketsService.ordersByCustomer(user.sub);

    return { ...customer, tickets: orders };
  }

  @Get('address')
  async getAddress(@Req() req: Request) {
    const user = req.user as PayloadToken;
    const customer = await this.usersService.findCustomer(user.sub);
    const addresses = await this.addressService.findManyByCustomerId(
      customer.id,
    );

    return addresses;
  }

  @Post('address')
  async createAddress(@Req() req: Request, @Body() address: CreateAddressDto) {
    const user = req.user as PayloadToken;
    const customer = await this.usersService.findCustomer(user.sub);

    if (customer.addresses.length >= 3) {
      return new ForbiddenException(new Error('only 3 addresses allowed'));
    }

    const newAddress = await this.addressService.create(address, customer);

    return newAddress;
  }

  @Patch('address/:id')
  async update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() updateAddressDto: UpdateAddressDto,
  ) {
    const user = req.user as PayloadToken;
    const customer = await this.usersService.findCustomer(user.sub);
    const addressToModify = await this.addressService.findOne(id);

    if (addressToModify.customer !== customer) {
      return new ForbiddenException(new Error('action not allowed'));
    }
    return this.addressService.update(id, updateAddressDto);
  }

  @Get('orders')
  async getOrders(@Req() req: Request) {
    const user = req.user as PayloadToken;

    console.log(user);
    return this.ticketsService.ordersByCustomer(user.sub);
  }

  @Get('orders/:id')
  async getOrder(@Req() req: Request, @Param() params: OrderIdDto) {
    const user = req.user as PayloadToken;

    console.log(user);
    return this.ticketsService.orderByCustomer(user.sub, params.id);
  }
}
