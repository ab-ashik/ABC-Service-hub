import { ClientEntity } from "src/clients/clients.entity";
import { WorkersEntity } from "src/worker/worker.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

export enum OrderStatus {
    PENDING = 'pending',
    PROCESSING = 'processing',
    SHIPPED = 'shipped',
    DELIVERED = 'delivered',
    CANCELLED = 'cancelled',
  }

  export enum PaymentMethod {
    CASH_ON_DELIVERY = 'cash_on_delivery',
    CREDIT_CARD = 'credit_card',
    DEBIT_CARD = 'debit_card',
    PAYPAL = 'paypal',
  }
  

@Entity('order')
export class OrderEntity {
    @PrimaryGeneratedColumn()
    orderId: number;

    @Column({ type: 'date', default: () => 'CURRENT_DATE'})
    orderDate: Date;

    @Column()
    totalPrice: number;


    @Column()
    quantity: number;

    @Column({ default: "pending" })
    status: string;

  @Column({ default: PaymentMethod.CASH_ON_DELIVERY })
  paymentMethod: PaymentMethod;
  
//!   many orders belong to one customer
    @ManyToOne(()=> ClientEntity, client => client.orders)
    client: ClientEntity;

    @ManyToOne(() => WorkersEntity, worker => worker.orders)
    worker: WorkersEntity;

    // @OneToOne(() => PaymentEntity, payment => payment.order)
    // @JoinColumn()
    // payment: PaymentEntity;
}