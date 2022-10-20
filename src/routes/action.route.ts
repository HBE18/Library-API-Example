import express from 'express';
import {
    borrowBook,
    checkBookStatus,
    checkOwnership,
    rateBook,
    returnBook,
} from '../middlewares/business.middleware';

const actionRouter = express.Router({ mergeParams: true });

actionRouter.route('/borrow/:bookId').post(checkBookStatus, borrowBook);

actionRouter.route('/return/:bookId').post(checkOwnership, rateBook, returnBook);

export default actionRouter;
