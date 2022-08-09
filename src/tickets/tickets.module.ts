import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { TicketItem } from './entities/ticketItem.entity';
import { TicketItemsController } from './ticket-items/ticket-items.controller';
import { TicketItemsService } from './ticket-items/ticket-items.service';
import { UsersModule } from '../users/users.module';
import { ProductsModule } from '../products/products.module';
import { StatusService } from './status/status.service';
import { StatusController } from './status/status.controller';
import { Status } from './entities/status.entity';
import { PaymentsModule } from '../payments/payments.module';
import { StoresModule } from '../stores/stores.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ticket, TicketItem, Status]),
    UsersModule,
    ProductsModule,
    PaymentsModule,
    StoresModule,
  ],
  controllers: [TicketsController, TicketItemsController, StatusController],
  providers: [TicketsService, TicketItemsService, StatusService],
  exports: [TicketsService],
})
export class TicketsModule {}
