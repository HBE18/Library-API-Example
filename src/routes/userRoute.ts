import express from 'express';
import { createUser, getUser, getUsers } from '../middlewares/business.middleware';
import actionRouter from './action.route';


const userRouter = express.Router({mergeParams:true});

userRouter
.route("/")
.get(getUsers)
.post(createUser);

userRouter
.route("/:userId")
.get(getUser);

userRouter.use("/:userId/",actionRouter);

export default userRouter;