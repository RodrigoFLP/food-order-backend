import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { PayloadToken } from '../auth/models/token.model';
import { TicketsService } from '../tickets/tickets.service';

@Controller('profile')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProfileController {
  constructor(private ticketsServices: TicketsService) {}

  @Get('orders')
  async getOrders(@Req() req: Request) {
    const user = req.user as PayloadToken;

    return this.ticketsServices.ordersByCustomer(user.sub);
  }
}
