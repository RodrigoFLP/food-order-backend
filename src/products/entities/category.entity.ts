import { Exclude, Expose } from 'class-transformer';
import { IsUrl } from 'class-validator';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Product } from './product.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @IsUrl()
  @Column({ type: 'varchar', length: 255, nullable: true })
  image: string;

  @Expose()
  get productsList() {
    if (this.products) {
      return this.products.map((item) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        image: item.image,
        price: item.portions[0].price,
      }));
    }
    return [];
  }

  @Exclude()
  @ManyToMany(() => Product, (product) => product.categories, {
    nullable: true,
  })
  @JoinTable()
  products: Product[];
}
