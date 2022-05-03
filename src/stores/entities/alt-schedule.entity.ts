import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Store } from './store.entity';

@Entity()
export class AltSchedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  overrideStartDate: Date;

  @Column({ type: 'date' })
  overrideEndDate: Date;

  @Column({ type: 'int' })
  dayOfWeek: number;

  @Column({ type: 'time' })
  AltOpenTime: Date;

  @Column({ type: 'time' })
  AltCloseTime: Date;

  @ManyToOne(() => Store, (store) => store.altSchedules)
  store: Store;
}
