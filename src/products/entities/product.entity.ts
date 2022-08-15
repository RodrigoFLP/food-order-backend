import {} from '@nestjs/typeorm';
import { IsNumber, IsString, IsUrl } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TicketItem } from '../../tickets/entities/ticketItem.entity';
import { Category } from './category.entity';
import { Tag as TagEntity } from './tag.entity';

@Entity()
export class Product {
  @PrimaryColumn({ unique: true })
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'numeric', precision: 15, scale: 4 })
  price: number;

  @Column({ type: 'jsonb' })
  portions: Portion[];

  @Column({ type: 'jsonb', nullable: false, default: [] })
  portionsTagGroups: TagGroup[];

  @Column({ type: 'jsonb' })
  tags: Tag[];

  @IsUrl()
  @Column({ type: 'varchar', length: 255, nullable: true })
  image: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @ManyToMany(() => Category, (category) => category.products, {
    onDelete: 'CASCADE',
  })
  categories: Category[];

  @ManyToMany(() => TagEntity, (tags) => tags.products, {
    onDelete: 'CASCADE',
  })
  tagsCategories: TagEntity[];

  @OneToMany(() => TicketItem, (ticketItem) => ticketItem.ticket)
  ticketItems: TicketItem[];
}

export class Portion {
  id: string;
  @IsString()
  name: string;
  @IsNumber()
  price: number;
  tagGroups: TagGroup[];
}

export class TagGroup {
  id: string;
  name: string;
  portions: number[];
  color: string;
  max: number;
  min: number;
  hidden: boolean;
  tags: Tag[];
}

export class Tag {
  id: string;
  name: string;
  value: string;
  price: number;
  ratio: number;
}
