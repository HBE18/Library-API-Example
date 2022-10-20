import express from 'express';
import { borrowBook, checkBookStatus } from '../middlewares/business.middleware';

const actionRouter = express.Router({ mergeParams: true });

actionRouter.route('/borrow/:bookId').post(checkBookStatus,borrowBook);

actionRouter.route('/return/:bookId').post((req, res) => {
    console.log('Return OK');
    res.sendStatus(204);
});

export default actionRouter;
