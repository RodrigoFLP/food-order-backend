import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Ticket } from '../../tickets/entities/ticket.entity';
import { AltSchedule } from './alt-schedule.entity';
import { Schedule } from './schedule.entity';

@Entity()
export class Store {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  state: string;

  @Column({ type: 'varchar', length: 255 })
  city: string;

  @Column({ type: 'varchar', length: 255 })
  addressLine1: string;

  @Column({ type: 'varchar', length: 255 })
  addressLine2: string;

  @Column({ type: 'varchar', length: 255 })
  addressReference: string;

  @Column({ type: 'varchar', length: 255 })
  phoneNumber: string;

  @Column({ type: 'boolean' })
  isDeliveryEnabled: boolean;

  @Column({ type: 'boolean' })
  isPickupEnabled: boolean;

  @Column({ type: 'boolean' })
  isSchedulingEnabled: boolean;

  @Column({ type: 'boolean' })
  productException: boolean;

  @OneToMany(() => Schedule, (schedule) => schedule.store)
  schedules: Schedule[];

  @OneToMany(() => AltSchedule, (altSchedule) => altSchedule.store)
  altSchedules: AltSchedule[];

  @OneToMany(() => Ticket, (ticket) => ticket.address)
  tickets: Ticket[];
}
