import { Module } from '@nestjs/common';
import { TicketsModule } from '../tickets/tickets.module';
import { ProfileController } from './profile.controller';

@Module({
  imports: [TicketsModule],
  controllers: [ProfileController],
})
export class ProfileModule {}
