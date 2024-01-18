import dotenv from 'dotenv';
import express, { Express } from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import getDatabaseConfig from './configs/databaseConfig'
import DatabaseManager from './database/DatabaseManager';
import { Environment } from './enums/Environment'
import UserRouter from './routers/UserRouter';
import ConversationRouter from './routers/ConversationRouter';
import * as process from 'process';

dotenv.config();

export default class StudyBuddyServer {
    public readonly app: Express;
    public readonly environment: string
    private server: http.Server;

    constructor() {
        this.app = express();
        this.server = http.createServer(this.app);
        this.environment = process.env.NODE_ENV as Environment || Environment.Development
    }

    private configureMiddlewares(): void {
        this.app.use(cors({ credentials: true }));
        this.app.use(compression());
        this.app.use(cookieParser());
        this.app.use(bodyParser.json());
    }

    private configureRoutes(): void {
        this.app.use('/user', new UserRouter().getRouter());
        this.app.use('/conversation', new ConversationRouter().getRouter());
        this.app.get('/', (req, res): void => {
            res.json({message: 'Hello from the Study Buddy backend.'});
        });
    }

    private async initializeDatabase(): Promise<void> {
        const dbManager: DatabaseManager = new DatabaseManager(getDatabaseConfig(this.environment));
        try {
            await dbManager.initialize();
        } catch (error) {
            console.error('Error during database initialization:', error);
            throw error;
        }
    }

    private startServer(): void {
        const port: string = process.env.PORT || '8080';

        this.server.listen(port, (): void => {
            console.log(`Server running on ${port}`);
        });
    }

    public async start(): Promise<void> {
        this.configureMiddlewares();
        this.configureRoutes();

        try {
            if (process.env.NODE_ENV !== 'test') {
                await this.initializeDatabase();
                this.startServer();
            }
        } catch (error) {
            console.error('Error during server startup:', error);
            process.exit(1); // Exit the process with an error code
        }
    }
}

// Create an instance of the server and start it
const studyBuddyServer = new StudyBuddyServer();
studyBuddyServer.start();
