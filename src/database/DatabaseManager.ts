import {Dialect, Sequelize} from "sequelize";
import User from "../models/User";
import Conversation from "../models/Conversation";
import DatabaseAssociation from "../models/Association"

interface DatabaseConfig {
    username: string;
    password: string;
    database: string;
    host: string;
    dialect: string;
    storage?: string;
}

export default class DatabaseManager {
    private sequelize: Sequelize;

    constructor(private config: DatabaseConfig) {
        this.validateDialect();
        const {database, username, password, host, dialect, storage} = this.config
        const sequelizeOptions = {host, dialect: dialect as Dialect, storage}

        this.sequelize = new Sequelize(database, username, password, sequelizeOptions)
    }

    public async initialize(): Promise<void> {
        try {
            await this.authenticate();
            await this.syncModels();
        } catch (error) {
            console.log('Database initialization failed:', error);
        }
    }

    private async authenticate(): Promise<void> {
        try {
            await this.sequelize.authenticate();
            console.log('Connection has been established')
        } catch (error) {
            console.log('Unable to connect to database:', error);
            throw error;
        }
    }

    private async syncModels(): Promise<void> {
        try {
            User.initModel(this.sequelize)
            Conversation.initModel(this.sequelize)
            DatabaseAssociation.associateModels()
            await this.sequelize.sync();
            console.log('Database synchronized.');
        } catch (error) {
            console.error('Unable to sync models with the database:', error);
            throw error;
        }
    }

    private validateDialect(): void {
        if (!this.config.dialect) {
            throw new Error("Incorrect DB_DIALECT in .env");
        }
    }
}