import express from 'express';
import { createUser, getUser, getUsers, validate } from '../middlewares/business.middleware';
import actionRouter from './action.route';
import { body } from 'express-validator';

const userRouter = express.Router({ mergeParams: true });

userRouter
    .route('/')
    .get(getUsers)
    .post(body('name').matches(/^[\w].{1,30}$/), validate, createUser);

userRouter.route('/:userId').get(getUser);

userRouter.use('/:userId/', actionRouter);

export default userRouter;
