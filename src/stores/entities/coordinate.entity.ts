import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Area } from './area.entity';

@Entity()
export class Coordinate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'float8' })
  lat: number;

  @Column({ type: 'float8' })
  lon: number;

  @ManyToOne(() => Area, (area) => area.coordinates)
  area: Area;
}
