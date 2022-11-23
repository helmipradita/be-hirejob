const express = require('express');
const cors = require(`cors`);
const morgan = require(`morgan`);
const bodyParser = require(`body-parser`);
require(`dotenv`).config();

const { Client } = require('pg');
const connectionString = process.env.PG_CONNECT;
const client = new Client({
  connectionString,
});

client.connect((err) => {
  if (err) {
    console.log('<:: PostgreSQL Client Error', err);
  } else {
    console.log(`::> PostgreSQL Client Connected`);
  }
});

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

app.all('*', (req, res, next) => {
  res.status(404).json({ status: 'error', statusCode: 404 });
});

app.use('/', (req, res, next) => {
  res.status(200).json({ status: 'success', statusCode: 200 });
});

app.listen(port, () => {
  console.log(`🚀 Example app listening on port ${port}`);
});
