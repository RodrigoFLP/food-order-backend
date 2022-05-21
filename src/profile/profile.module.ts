import { Module } from '@nestjs/common';
import { TicketsModule } from '../tickets/tickets.module';
import { UsersModule } from '../users/users.module';
import { ProfileController } from './profile.controller';

@Module({
  imports: [TicketsModule, UsersModule],
  controllers: [ProfileController],
})
export class ProfileModule {}
