import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Coordinate } from './coordinate.entity';
import { Store } from './store.entity';

@Entity()
export class Area {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'boolean' })
  isActive: boolean;

  @ManyToOne(() => Store, (store) => store.areas)
  store: Store;

  @OneToMany(() => Coordinate, (coordinate) => coordinate.area)
  coordinates: Coordinate[];
}
