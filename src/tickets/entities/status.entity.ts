import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Ticket } from './ticket.entity';

@Entity()
export class Status {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  orderPlaced: Date;

  @Column({ type: 'timestamptz', nullable: true })
  orderPaid: Date;

  @Column({ type: 'timestamptz', nullable: true })
  orderConfirmed: Date;

  @Column({ type: 'timestamptz', nullable: true })
  orderPrepared: Date;

  @Column({ type: 'timestamptz', nullable: true })
  orderReceived: Date;

  @OneToOne(() => Ticket)
  ticket: Ticket;
}
