import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Store } from './store.entity';

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  dayOfWeek: number;

  @Column({ type: 'time' })
  OpenTime: Date;

  @Column({ type: 'time' })
  CloseTime: Date;

  @ManyToOne(() => Store, (store) => store.schedules)
  store: Store;
}
