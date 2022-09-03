import { type } from "os";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";


export enum UserRole{
    ADMIM = 'admin',
    USER = 'user'
}

@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string

    @Column()
    password: string

    @Column({type: 'enum', enum:UserRole, default: UserRole.USER})
    role: UserRole
    
    @Column({default:false})
    isDeleted: boolean

    @CreateDateColumn({ name: 'created_at', select: false })
    createdAt: Date;
  
    @CreateDateColumn({ name: 'updated_at', select: false })
    updatedAt: Date;




}
