import { WorkersEntity } from "src/worker/worker.entity";
import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('review')
export class ReviewEntity {
     
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    customer_id: number;

    @Column()
    rating: number;

    @Column()
    comment: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    created_at: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP'})
    updated_at: Date;

    @ManyToOne(() => WorkersEntity, worker => worker.reviews)
    worker: WorkersEntity;
    
    }