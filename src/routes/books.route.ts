import express from 'express';
import { body } from 'express-validator';
import { createBook, getBook, getBooks, validate } from '../middlewares/business.middleware';

const booksRouter = express.Router();

booksRouter
    .route('/')
    .get(getBooks)
    .post(body('name').matches(/^[\w].{1,50}$/), validate, createBook);

booksRouter.route('/:bookId').get(getBook);

export default booksRouter;
