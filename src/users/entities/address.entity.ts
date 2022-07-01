import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Ticket } from '../../tickets/entities/ticket.entity';

import { Customer } from './customer.entity';

@Entity()
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  state: string;

  @Column({ type: 'varchar', length: 255 })
  city: string;

  @Column({ type: 'varchar', length: 255 })
  addressLine1: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  addressLine2: string;

  @Column({ type: 'varchar', length: 255 })
  addressReference: string;

  @Column({ type: 'float8', nullable: true })
  lat: number;

  @Column({ type: 'float8', nullable: true })
  lon: number;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @ManyToOne(() => Customer, (customer) => customer.addresses, {
    nullable: false,
  })
  customer: Customer;

  @OneToMany(() => Ticket, (ticket) => ticket.address)
  tickets: Ticket[];
}
