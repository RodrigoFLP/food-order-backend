import {} from '@nestjs/typeorm';
import { IsUrl } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TicketItem } from '../../tickets/entities/ticketItem.entity';
import { Category } from './category.entity';

@Entity()
export class Product {
  @PrimaryColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'numeric', precision: 15, scale: 4 })
  price: number;

  @Column({ type: 'jsonb' })
  portions: Portion[];

  @Column({ type: 'jsonb' })
  tags: Tag[];

  @IsUrl()
  @Column({ type: 'varchar', length: 255 })
  image: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @OneToMany(() => TicketItem, (ticketItem) => ticketItem.ticket)
  ticketItems: TicketItem[];
}

export class Portion {
  id: number;
  name: string;
  price: number;
}

export class Tag {
  id: number;
  name: string;
  value: string;
  price: number;
  ratio: number;
}
