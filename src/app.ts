import dotenv from 'dotenv';
import express, { Express } from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import { initializeDatabase } from './database/sequalize';
import UserRouter from './routers/UserRouter';
import ConversationRouter from './routers/ConversationRouter';
import AuthRouter from './routers/AuthRouter';
import * as process from 'process';

dotenv.config();

const app: Express = express();
const server = http.createServer(app);

const configureMiddlewares = async (): Promise<void> => {
    app.use(cors({ credentials: true }));
    app.use(compression());
    app.use(cookieParser());
    app.use(bodyParser.json());
};

const configureRoutes = async (): Promise<void> => {
    app.use('/auth', AuthRouter);
    app.use('/user', UserRouter);
    app.use('/conversation', ConversationRouter);
    app.get('/', (req, res) => {
        res.json({message: 'Hello from the Study Buddy backend'});
    });
};

const initialize = async (): Promise<void> => {
    try {
        // Initialize the database
        await initializeDatabase();
    } catch (error) {
        console.error('Error during database initialization:', error);
        throw error;
    }
};

const startServer = (): void => {
    const port: string = process.env.PORT || '8080';

    server.listen(port, (): void => {
        console.log(`Server running on ${port}`);
    });
};

const start = async (): Promise<void> => {
    await configureMiddlewares();
    await configureRoutes();

    try {
        if (process.env.NODE_ENV !== 'test') {
            await initialize();
            startServer();
        }
    } catch (error) {
        console.error('Error during server startup:', error);
        process.exit(1); // Exit the process with an error code
    }
};

start();

export default app;
