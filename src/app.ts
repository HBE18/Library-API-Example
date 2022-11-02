import * as dotenv from 'dotenv';
dotenv.config();
import { initalizeExpress } from './controllers/express.controller';
import "reflect-metadata";
import { AppDataSource } from './db/db.controller';

async function main() {
    // Initailize database connection
    AppDataSource.initialize();
    // Initialize express server at port `expressConfig.port`
    await initalizeExpress();
}

main();
