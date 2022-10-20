import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    "id": number

    // Didn't check the uniqueness of name since there are lots of duplicate names in real world
    @Column()
    "name": string

    @Column('int',{array:true,nullable:true})
    "books": number[]

    @Column('int',{array:true,unique:true,nullable:true})
    "record": number[]
}
