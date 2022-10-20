import express from 'express';
import { User } from '../models/user.model';
import { Book } from '../models/book.model';
import { AppDataSource } from '../db/db.controller';

export async function createUser(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) {
    const newUser = new User();
    newUser.name = req.body.name;
    AppDataSource.manager.save(newUser);
    res.sendStatus(204);
}

export async function getUser(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) {
    const requestedId = Number(req.params.userId);
    const userTable = AppDataSource.getRepository(User);
    const user = await userTable.findOneBy({ id: requestedId });
    if (user) {
        res.status(200).json({ 'User ID:': user.id, 'User Name:': user.name });
    } else {
        res.status(404).json({ error: 'User not found' });
    }
}

export async function getUsers(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) {
    const userTable = AppDataSource.getRepository(User);
    const users = await userTable.find();
    if (users) {
        res.status(200).json({
            Users: users,
        });
    } else {
        res.status(404).json({ error: 'No user found' });
    }
}

export async function getBooks(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) {
    const bookTable = AppDataSource.getRepository(Book);
    const books = await bookTable.find();
    if (books) {
        res.status(200).json({
            Books: books,
        });
    } else {
        res.status(404).json({ error: 'No book found'});
    }
}

export async function getBook(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) {
    const requestedId = Number(req.params.bookId);
    const userTable = AppDataSource.getRepository(Book);
    const user = await userTable.findOneBy({ id: requestedId });
    if (user) {
        res.status(200).json({ 'Book ID': user.id, 'Book Name': user.name });
    } else {
        res.status(404).json({ error: 'Book not found' });
    }
}

export async function createBook(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) {
    const newBook = new Book();
    newBook.name = req.body.name;
    AppDataSource.manager.save(newBook);
    res.sendStatus(204);
}