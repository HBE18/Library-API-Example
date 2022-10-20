import express from 'express';
import { body } from 'express-validator';
import {
    borrowBook,
    checkBookStatus,
    checkOwnership,
    rateBook,
    returnBook,
    validate,
} from '../middlewares/business.middleware';

const actionRouter = express.Router({ mergeParams: true });

actionRouter.route('/borrow/:bookId').post(checkBookStatus, borrowBook);

actionRouter
    .route('/return/:bookId')
    .post(body('score').matches(/^[\d]i*$/), validate, checkOwnership, rateBook, returnBook);

export default actionRouter;
