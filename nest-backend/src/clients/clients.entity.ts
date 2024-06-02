import { Column, Entity, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ContactInfoEntity } from './contact-info.entity';
import { OrderEntity } from 'src/order/order.entity';
import { ServiceEntity } from 'src/service/services.entity';
export enum status {
  Active = 'active',
  Inactive = 'inactive',
}
@Entity('client')
export class ClientEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  fullName: string;

  @Column()
  userName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'int', unsigned: true , nullable: true })
  age: number;

  @Column()
  profilePicture?: string;

  @Column({nullable: true})
  phoneNumber?: string;

  @Column()
  address?: string;

  @Column()
  dateOfBirth: Date;

  @Column()
  fbLinks?: string;


  @Column({
    type: 'enum',
    enum: status,
    default: status.Active,
  })
  status: status;

  @OneToOne(()=>ContactInfoEntity, contactInfo=>contactInfo.client)
  contactInfo:ContactInfoEntity;

  //! one client has many orders
  @OneToMany(()=> OrderEntity, order => order.client, {cascade: true})
  orders: OrderEntity[];

  @ManyToMany(()=> ServiceEntity, service=>service.clients)
  @JoinTable()
  services: ServiceEntity[];




  
 


  
}
