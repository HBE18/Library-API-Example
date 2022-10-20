import express from 'express';
import { createBook, getBook, getBooks } from '../middlewares/business.middleware';

const booksRouter = express.Router();

booksRouter.route('/').get(getBooks).post(createBook);

booksRouter.route('/:bookId').get(getBook);

export default booksRouter;
