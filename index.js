const express = require('express');
const cors = require(`cors`);
require(`dotenv`).config();

const app = express();
const port = process.env.PORT;

app.use(cors());

// app.all('*', (req, res, next) => {
//   response(res, 404, false, null, '404 Not Found');
// });

app.use('/', (req, res, next) => {
  res.status(200).json({ status: 'success', statusCode: 200 });
});

app.listen(port, () => {
  console.log(`🚀 Example app listening on port ${port}`);
});
