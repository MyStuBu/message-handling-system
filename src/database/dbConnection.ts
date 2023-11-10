import {Dialect, Sequelize} from "sequelize";
import path from "path";

const db: string = process.env.DB_NAME || '';
const username: string = process.env.DB_USER || '';
const password: string = process.env.DB_PASSWORD || '';
const host: string = process.env.DB_HOST || '';
const dialect: Dialect = process.env.DB_DIALECT as Dialect || 'sqlite';

if (!dialect) {
    throw new Error("Incorrect DB_DIALECT in .env");
}

let sequelizeOptions: {host: string, dialect: Dialect, storage?: string} = {
    host: host,
    dialect: dialect,
};

if (dialect === 'sqlite') {
    sequelizeOptions = {
        ...sequelizeOptions,
        storage: path.join(__dirname, "../storage/sqlite/database.sqlite"),
    };
}

const sequelize: Sequelize = new Sequelize(db, username, password, sequelizeOptions);

const initializeDatabase = async (): Promise<void> => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        // console.log('Database synchronized.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

export {sequelize, initializeDatabase};
