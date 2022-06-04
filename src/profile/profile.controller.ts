import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
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

@Controller('profile')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProfileController {
  constructor(
    private ticketsService: TicketsService,
    private customersService: CustomersService,
    private usersService: UsersService,
    private addressService: AddressesService,
  ) {}

  @Get('orders')
  async getOrders(@Req() req: Request) {
    const user = req.user as PayloadToken;

    return this.ticketsService.ordersByCustomer(user.sub);
  }

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

    const newAddress = await this.addressService.create(address, customer);

    return newAddress;
  }
}
