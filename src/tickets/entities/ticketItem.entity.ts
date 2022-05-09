import { Expose } from 'class-transformer';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Portion, Product, Tag } from '../../products/entities/product.entity';
import { Ticket } from './ticket.entity';

@Entity()
export class TicketItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'jsonb' })
  portion: Portion;

  @Column({ type: 'jsonb' })
  tags: Tag[];

  // @Expose()
  // get totalAmount(): number {
  //   console.log(this.product);
  // const portion = this.product.portions.find(
  //   (portion) => portion.name === this.portion.name,
  // );
  //   return portion.price * this.quantity;
  // }

  @Column({ type: 'numeric', precision: 15, scale: 4 })
  totalAmount: number;

  @ManyToOne(() => Product, (product) => product.ticketItems)
  product: Product;

  @ManyToOne(() => Ticket, (ticket) => ticket.ticketItems, {
    onDelete: 'CASCADE',
  })
  ticket: Ticket;
}
