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

@Module({
  imports: [
    TypeOrmModule.forFeature([Ticket, TicketItem]),
    UsersModule,
    ProductsModule,
  ],
  controllers: [TicketsController, TicketItemsController],
  providers: [TicketsService, TicketItemsService],
})
export class TicketsModule {}
