require('dotenv').config();

module.exports = {
  development: {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false,
    port: 5432,
  },

  test: {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false,
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
      },
    },
  },

  production: {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false,
    ssl: true,
    pool: {
      max: 20,
      min: 0,
      acquire: 60000,
      idle: 10000,
    },
    dialectOptions: {
      ssl: {
        require: true,
      },
    },
  },
};
