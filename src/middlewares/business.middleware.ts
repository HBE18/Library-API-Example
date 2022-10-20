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
        res.status(200).json({
            'User ID:': user.id,
            'User Name:': user.name,
            'Borrowed Books': user.books,
            'Borrow Record': user.record,
        });
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
        res.status(404).json({ error: 'No book found' });
    }
}

export async function getBook(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) {
    const requestedId = Number(req.params.bookId);
    const userTable = AppDataSource.getRepository(Book);
    const book = await userTable.findOneBy({ id: requestedId });
    if (book) {
        res.status(200).json({
            'Book ID': book.id,
            'Book Name': book.name,
            'Book Rating': book.Rating,
            'Book Rated Count': book.RatedTimes,
        });
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

export async function borrowBook(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) {
    const userID: number = Number(req.params.userId);
    const bookID: number = Number(req.params.bookId);
    if (!userID || !bookID) {
        res.sendStatus(500);
    }
    await AppDataSource.query(
        'UPDATE public.User SET books = array_append(books,$1) WHERE id=$2;',
        [bookID, userID],
    );
    await AppDataSource.query(
        'UPDATE public.User SET record = array_append(record,$1) WHERE id=$2;',
        [bookID, userID],
    );
    await AppDataSource.createQueryBuilder()
        .update(Book)
        .set({ Borrowed: true })
        .where('id=:id', { id: bookID })
        .execute();
    res.sendStatus(204);
}

export async function checkBookStatus(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) {
    const bookID: number = Number(req.params.bookId);
    const bookTable = AppDataSource.manager.getRepository(Book);
    const book = await bookTable.findOneBy({ id: bookID });
    if (book) {
        if (book.Borrowed) {
            res.status(400).json({
                error: 'This book is borrowed, cannot re-borrow before it is returned',
            });
        }
        next();
    } else {
        res.status(400).json({ error: 'Given book ID is not found' });
    }
}

export async function rateBook(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) {
    const bookID = Number(req.params.bookId);
    const score = Number(req.body.score);
    const bookTable = AppDataSource.manager.getRepository(Book);
    const book = await bookTable.findOneBy({ id: bookID });
    if (book) {
        AppDataSource.manager.update(Book, bookID, {
            Rating: (book.Rating * book.RatedTimes + score) / (book.RatedTimes + 1),
            RatedTimes: book.RatedTimes + 1,
        });
        next();
    } else {
        res.status(500).json({ error: 'Rating unsuccesfull' });
    }
}

export async function checkOwnership(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) {
    const bookID = Number(req.params.bookId);
    const userID = Number(req.params.userId);

    const own: number = await AppDataSource.getRepository(User)
        .createQueryBuilder('user')
        .select()
        .where('id = :id', { id: userID })
        .andWhere(':bookid = ANY(books)', { bookid: bookID })
        .getCount();
    if (own > 0) {
        next();
    } else {
        res.status(404).json({ error: 'User does not own the given book' });
    }
}

export async function returnBook(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) {
    const bookID = Number(req.params.bookId);
    const userID = Number(req.params.userId);

    await AppDataSource.query(
        'UPDATE public.User SET books = array_remove(books,$1) WHERE id=$2;',
        [bookID, userID],
    );
    await AppDataSource.createQueryBuilder()
        .update(Book)
        .set({ Borrowed: false })
        .where('id=:id', { id: bookID })
        .execute();
    res.sendStatus(204);
}
