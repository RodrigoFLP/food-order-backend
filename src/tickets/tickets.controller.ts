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

@Controller('tickets')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TicketsController {
  constructor(
    private readonly ticketsService: TicketsService,
    private userService: UsersService,
    private wompiService: WompiService,
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
  @Public()
  calculatePrice(@Body() createTicketDto: CreateTicketDto) {
    console.log(createTicketDto);
    return this.ticketsService.calculatePrice(createTicketDto);
  }

  @Roles(Role.ADMIN, Role.SUPERADMIN)
  @Get()
  findAll() {
    return this.ticketsService.findAll();
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
    return this.ticketsService.remove(+id);
  }
}
