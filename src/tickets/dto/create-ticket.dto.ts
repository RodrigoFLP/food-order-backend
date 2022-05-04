import { Timestamp } from 'typeorm';

export class CreateTicketDto {
  customerId: number;
  customerAddressId: number;
  couponId?: string;
  totalAmount: number;
  status: string;
  orderType: string;
  scheduledDate?: Date;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  storeId: number;
}
