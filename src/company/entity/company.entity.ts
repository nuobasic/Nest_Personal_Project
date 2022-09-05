import { clearLine } from "readline";
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

@Entity('company')
export class Company{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    companyname: string

    @Column()
    country: string
    
    @Column()
    city: string

    @CreateDateColumn({ name: 'created_at', select: false })
    createdAt: Date;
  
    @CreateDateColumn({ name: 'updated_at', select: false })
    updatedAt: Date;
}