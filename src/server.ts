import dotenv from 'dotenv';
import app from './app'
import http from 'http';
import {initializeDatabase} from './database/dbConnection';

dotenv.config()

const startServer = async () => {
    try {
        // Initialize the database
        await initializeDatabase();

        // Create and start the server
        const server = http.createServer(app);
        const port = process.env.PORT || '8080';

        server.listen(port, () => {
            console.log(`Server running on ${port}`);
        });
    } catch (error) {
        console.error('Error during server startup:', error);
    }
};

// Start the server
startServer();
