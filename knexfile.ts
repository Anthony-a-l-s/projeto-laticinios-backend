import type { Knex } from "knex";
import 'dotenv/config'
import path = require("path")


const config: { [key: string]: Knex.Config } = {

  development: {
    client: "mysql2",
    connection: {
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      dateStrings: true
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: path.resolve(__dirname, 'src', 'shared', 'infra', 'migrations')
    }
  }

};

module.exports = config;
