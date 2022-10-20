import { Book } from './../models/book.model';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../models/user.model';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '123456',
    database: 'Library',
    entities: [User, Book],
    synchronize: true,
    logging: false,
});
