import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
  Inject,
  Headers,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/models/roles.model';
import { Public } from '../auth/decorators/public.decorator';
import { Request } from 'express';
import { PayloadToken } from '../auth/models/token.model';
import { UsersService } from '../users/users.service';
import { WompiService } from '../payments/wompi/wompi.service';
import { WompiWebhookBody } from '../payments/interfaces/confirm-payment';

import { HmacSHA256 } from 'crypto-js';
import config from '../../config';
import { ConfigType } from '@nestjs/config';
import { StatusType } from './models/status.model';
import { StatusService } from './status/status.service';

@Controller('tickets')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TicketsController {
  constructor(
    private readonly ticketsService: TicketsService,
    private statusService: StatusService,
    private userService: UsersService,
    private wompiService: WompiService,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  @Post()
  async create(
    @Req() request: Request,
    @Body() createTicketDto: CreateTicketDto,
  ) {
    const user = request.user as PayloadToken;

    const {
      customer: { id },
    } = await this.userService.findOne(user.sub); //TODO: extract customerId

    const ticket = await this.ticketsService.create(createTicketDto, id);

    const paymentLink = await this.wompiService.createPaymentLink(
      ticket.id,
      ticket.totalAmount,
    );

    return paymentLink;
  }

  @Post('calculate')
  calculatePrice(@Body() createTicketDto: CreateTicketDto) {
    // console.log(createTicketDto);
    return this.ticketsService.calculatePrice(createTicketDto);
  }

  @Public()
  @Get('confirm-payment')
  confirmPayment(
    @Query('id') id: string,
    @Body() wompiWebhookBody: WompiWebhookBody,
    @Headers('wompi_hash') wompiHash,
  ) {
    console.log('wompiWebhoookBody: ', wompiWebhookBody);
    console.log('wompiHash: ', wompiHash);
    console.log('id: ', id);

    const hash = HmacSHA256(
      JSON.stringify(wompiWebhookBody),
      this.configService.wompi.apiSecret,
    );

    console.log('hash: ', hash);

    if (hash !== wompiHash) {
      throw new BadRequestException();
    }

    this.ticketsService.confirmPayment(id);

    return 'Payment succesfull';
  }

  @Roles(Role.ADMIN, Role.SUPERADMIN)
  @Get()
  findAll() {
    return this.ticketsService.findAll();
  }

  @Roles(Role.ADMIN, Role.SUPERADMIN)
  @Get('active')
  findAllActive() {
    return this.ticketsService.findAllActive();
  }

  @Roles(Role.ADMIN, Role.SUPERADMIN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketsService.findOne(+id);
  }

  @Roles(Role.ADMIN, Role.SUPERADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto) {
    return this.ticketsService.update(+id, updateTicketDto);
  }

  @Roles(Role.ADMIN, Role.SUPERADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketsService.remove(id);
  }

  @Roles(Role.ADMIN, Role.SUPERADMIN)
  @Patch('status/:statusid')
  updateStatus(
    @Param('statusid') id: number,
    @Body() body: { status: StatusType },
  ) {
    console.log(body.status);
    return this.statusService.update(id, body.status);
  }
}
