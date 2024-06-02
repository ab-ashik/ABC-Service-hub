import { OrderEntity } from "src/order/order.entity";
import { ReviewEntity } from "src/review/review.entity";
import { ServiceEntity } from "src/service/services.entity";
import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { WorkerInfoEntity } from "./workerInfo.entity";

@Entity("worker")
export class WorkersEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name: string;

    @Column()
    profilePicture: string;

    @Column()
    email:string;

    @Column()
    password: string;

    // @Column()
    // phone: string;

    // @Column()
    // address: string;

    // @Column()
    // bio:string;


    @Column('decimal',{ precision: 10, scale: 2})
    hourlyRate: number;

    @Column({ default: true})
    availability: boolean;
    //randomNumber: number;

    @BeforeInsert()
    generateRandomNumber()
    {
        this.id = Math.floor(Math.random() * 1000);
    }

    @ManyToMany(() => ServiceEntity, service => service.workers)
    @JoinTable()
    services: ServiceEntity[];

    @OneToMany(() => ReviewEntity, review => review.worker)
    reviews: ReviewEntity[];

    @OneToMany(() => OrderEntity, order => order.worker)
    orders: OrderEntity[];

    @OneToOne(() => WorkerInfoEntity, workerInfo => workerInfo.worker, {cascade: true})
    workerInfo: WorkerInfoEntity;
    
}