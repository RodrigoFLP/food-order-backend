import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../auth/models/roles.model';
import { CreateTicketItemDto } from '../dto/create-ticket-item.dto';
import { UpdateTicketItemDto } from '../dto/update-ticket-item.dto';
import { TicketItemsService } from './ticket-items.service';

@Controller('ticket-items')
export class TicketItemsController {
  constructor(private readonly ticketItemsService: TicketItemsService) {}

  @Post()
  create(@Body() createTicketItemDto: CreateTicketItemDto) {
    return this.ticketItemsService.create(createTicketItemDto);
  }

  @Roles(Role.ADMIN, Role.SUPERADMIN)
  @Get()
  findAll() {
    return this.ticketItemsService.findAll();
  }

  @Roles(Role.ADMIN, Role.SUPERADMIN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketItemsService.findOne(+id);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateTicketItemDto: UpdateTicketItemDto,
  // ) {
  //   return this.ticketItemsService.update(+id, updateTicketItemDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.ticketItemsService.remove(+id);
  // }
}
