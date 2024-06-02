import { ClientEntity } from 'src/clients/clients.entity';
import { WorkersEntity } from 'src/worker/worker.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
export enum status {
  Active = 'active',
  Inactive = 'inactive',
}
@Entity('service')
export class ServiceEntity {
  @PrimaryGeneratedColumn()
  serviceId: number;

  @Column()
  service_name: string;

  @Column()
  service_description: string;

  @Column()
  price: number;

  // @Column()
  // location: string;

  // @Column()
  // rating: string;

  // @Column()
  // serviceImg?: string;

  @ManyToMany(() => ClientEntity, (client) => client.services)
  clients: ClientEntity[];

  @ManyToMany(() => WorkersEntity, (worker) => worker.services)

  workers: WorkersEntity[];

}
