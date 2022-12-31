const { Pool } = require(`PG`);
require(`dotenv`).config();

const connect = process.env.PG_CONNECT;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

pool.connect((err) => {
  if (err) {
    console.log("<:: PostgreSQL Client Error", err);
  } else {
    console.log(`::> PostgreSQL Client Connected`);
  }
});

module.exports = pool;
