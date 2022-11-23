const { Pool } = require(`pg`);

const pool = new Pool({
  host: process.env.PG_HOST,
  user: process.env.PG_USER,
  database: process.env.PG_DB,
  password: process.env.PG_PASS,
  port: process.env.PG_PORT,
});

pool.connect((err) => {
  if (err) {
    console.log('<:: PostgreSQL Client Error', err);
  } else {
    console.log(`::> PostgreSQL Client Connected`);
  }
});

module.exports = pool;
