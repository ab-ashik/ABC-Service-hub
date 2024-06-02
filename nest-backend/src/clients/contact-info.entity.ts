import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ClientEntity } from "./clients.entity";

@Entity('clientContactInfo')
export class ContactInfoEntity {
    @PrimaryGeneratedColumn()
    contactInfoId: number;
    
    @Column()
    phoneNumber: string;
    @Column()
    email: string;

    // @Column()
    // clientId: number;

    @OneToOne(()=> ClientEntity, client =>client.contactInfo, {onDelete: "CASCADE"})
    @JoinColumn()
    client: ClientEntity;


}