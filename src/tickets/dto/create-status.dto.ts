import { IsUUID } from 'class-validator';

export class CreateStatusDto {
  @IsUUID()
  ticketId: string;
}
