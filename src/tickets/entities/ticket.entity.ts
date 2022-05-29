import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Store } from '../../stores/entities/store.entity';
import { Address } from '../../users/entities/address.entity';
import { Customer } from '../../users/entities/customer.entity';
import { Status } from './status.entity';
import { TicketItem } from './ticketItem.entity';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  couponId?: string;

  // @Column({ type: 'numeric', precision: 15, scale: 4 })
  // @Expose()
  // get totalAmount(): number {
  //   return 2000;
  // }

  @Column({ type: 'numeric', precision: 15, scale: 4 })
  totalAmount: number;

  @Column({ type: 'varchar', length: 255 })
  orderType: string;

  @Column({ type: 'date' })
  scheduledDate?: Date;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @ManyToOne(() => Address, (address) => address.tickets)
  address: Address;

  @ManyToOne(() => Store, (store) => store.tickets)
  store: Store;

  @ManyToOne(() => Customer, (customer) => customer.tickets)
  customer: Customer;

  @ManyToOne(() => Status, (status) => status.id, { nullable: true })
  status: Status;

  @OneToMany(() => TicketItem, (ticketItem) => ticketItem.ticket, {
    onDelete: 'CASCADE',
  })
  ticketItems: TicketItem[];
}
