import { IsUUID } from 'class-validator';

export class OrderIdDto {
  @IsUUID()
  id: string;
}
