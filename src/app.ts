import dotenv from 'dotenv';
import express, { Express } from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import UserRouter from './routers/UserRouter'
import { initializeDatabase } from './database/sequalize';
import ConversationRouter from "./routers/ConversationRouter";

dotenv.config();

const app: Express = express();

app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

app.use('/user', UserRouter)
app.use('/conversation', ConversationRouter);
app.get('/', (req, res) => {
    res.send('Hello World!');
});

const startServer = async (): Promise<void> => {
    try {
        // Initialize the database
        await initializeDatabase();

        // Create and start the server
        const server = http.createServer(app);
        const port: string = process.env.PORT || '8080';

        server.listen(port, ():void => {
            console.log(`Server running on ${port}`);
        });
    } catch (error) {
        console.error('Error during server startup:', error);
    }
};

// Start the server
startServer();
