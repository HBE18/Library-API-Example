import { expressConfig } from './../constants';
import express from 'express';
import userRouter from '../routes/user.route';
import booksRouter from '../routes/books.route';

const cors = require('cors');
const app = express();

export async function initalizeExpress() {
    app.use(express.json());
    app.use(
        cors({
            origin: '*',
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            preflightContinue: true,
            optionsSuccessStatus: 204,
        }),
    );
    app.use('/users', userRouter);
    app.use('/books', booksRouter);

    const port: number = expressConfig.port | 3000;
    const msg = `The app is running on http://localhost:${port}`;

    app.get('/', async (req, res) => {
        // Basic route for server online check
        res.status(200).send(msg);
    });

    app.listen(port, () => {
        // Server listens to the port defined in `../constants.ts`
        console.log(msg);
    });
}

module.exports;
