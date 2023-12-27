import {Dialect, Sequelize} from "sequelize";
import * as process from "process";
import config from './config'

let databaseConfig: {
    username: string,
    password: string,
    database: string,
    host: string,
    dialect: string,
    storage: string | undefined
};

switch (process.env.NODE_ENV) {
    case 'development':
        databaseConfig = config.development;
        break;
    case 'test':
        databaseConfig = config.test;
        break;
    default:
        databaseConfig = config.production;
}

const database: string = databaseConfig.database;
const username: string = databaseConfig.username;
const password: string = databaseConfig.password;
const host: string = databaseConfig.host;
const dialect: Dialect = databaseConfig.dialect as Dialect;
const storage: string | undefined = databaseConfig.storage;

if (!dialect) {
    throw new Error("Incorrect DB_DIALECT in .env");
}

const sequelizeOptions: { host: string, dialect: Dialect, storage?: string } = {
    host: host,
    dialect: dialect,
    storage: storage
};

const sequelize: Sequelize = new Sequelize(database, username, password, sequelizeOptions);

const initializeDatabase = async (): Promise<void> => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        require('../models/User');
        require('../models/Conversation');
        require('../models/Associations');
        await sequelize.sync()
        console.log('Database synchronized.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

export {sequelize, initializeDatabase};
