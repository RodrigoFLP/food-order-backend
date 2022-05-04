import { IsUrl } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Product } from './product.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @IsUrl()
  @Column({ type: 'varchar', length: 255, nullable: true })
  image: string;

  @OneToMany(() => Product, (product) => product.category, { nullable: true })
  products: Product[];
}
