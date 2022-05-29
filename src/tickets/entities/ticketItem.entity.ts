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

  @Column({ type: 'jsonb', nullable: true })
  tags: Tag[];

  @Column({ type: 'numeric', precision: 15, scale: 4 })
  totalAmount: number;

  @ManyToOne(() => Product, (product) => product.ticketItems)
  product: Product;

  @ManyToOne(() => Ticket, (ticket) => ticket.ticketItems, {
    onDelete: 'CASCADE',
  })
  ticket: Ticket;
}
