import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export interface IUser {
    id: number;
    email: string;
    name: string;
    password: string;
}

@Entity('users')
export class User implements IUser {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true, nullable: false})
    email: string;

    @Column({unique: true})
    name: string;

    @Column()
    password: string;
    
}

