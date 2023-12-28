import path from "path";

interface Configurations {
    [key: string]: {
        username: string;
        password: string;
        database: string;
        host: string;
        dialect: string;
        storage: string;
    };
}

const configurations: Configurations = {
    "development": {
        "username": process.env.DB_USER || '',
        "password": process.env.DB_PASSWORD || '',
        "database": process.env.DB_NAME || '',
        "host": process.env.DB_HOST || '',
        "dialect": process.env.DB_DIALECT || 'sqlite',
        "storage": path.join(__dirname, "../../sqlite/database.sqlite")
    },
    "test": {
        "username": process.env.TEST_DB_USER || "",
        "password": process.env.TEST_DB_PASSWORD || "",
        "database": process.env.TEST_DB_NAME || "",
        "host": process.env.TEST_DB_HOST || "",
        "dialect": process.env.TEST_DB_DIALECT || "sqlite",
        "storage": ":memory:"
    },
    "production": {
        "username": process.env.DB_USER || '',
        "password": process.env.DB_PASSWORD || '',
        "database": process.env.DB_NAME || '',
        "host": process.env.DB_HOST || '',
        "dialect": process.env.DB_DIALECT || 'sqlite',
        "storage":  path.join(__dirname, "../../sqlite/database.sqlite")
    }
};

const getDatabaseConfig = (env: string): Configurations[string] => {
    if (!(env in configurations)) {
        throw new Error(`Environment "${env}" not found in configurations.`);
    }

    return configurations[env];
};

export default getDatabaseConfig;
