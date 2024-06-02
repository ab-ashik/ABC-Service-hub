import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { WorkersEntity } from "./worker.entity";

@Entity('worker_info')
export class WorkerInfoEntity {
    
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    bio: string;
  
    @Column()
    address: string;

    @Column()
    phone: string;
  
    // @Column({ type: 'decimal', precision: 10, scale: 2 })
    // hourlyRate: number;

    //add birthdate , set the standard format
    @Column({ type: 'date', default: '2001-01-01'})
    birthDate: Date;

  
  
    @OneToOne(() => WorkersEntity, worker => worker.workerInfo)
    @JoinColumn()
    worker: WorkersEntity;

    }
    

