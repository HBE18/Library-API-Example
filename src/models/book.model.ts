import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    'id': number;

    @Column()
    'name': string;

    @Column({ default: false })
    'Borrowed': boolean;

    @Column('float', { default: 0.0 })
    'Rating': number;

    @Column({ default: 0 })
    'RatedTimes': number;
}
