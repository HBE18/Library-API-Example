import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    "id": number

    @Column()
    "name": string

    @Column('int',{array:true,nullable:true})
    "books": number[]
}