const fs = require('fs');


module.exports = {
  "development": {
    "username": process.env.DB_USER || '',
    "password": process.env.DB_PASSWORD || '',
    "database": process.env.DB_NAME || '',
    "host": process.env.DB_HOST || '',
    "dialect": process.env.DB_DIALECT || 'sqlite'
  },
  "test": {
    "username": "",
    "password": null,
    "database": "",
    "host": "",
    "dialect": ""
  },
  "production": {
    "username": "",
    "password": null,
    "database": "",
    "host": "",
    "dialect": ""
  }
}

