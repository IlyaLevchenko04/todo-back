const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const http = require('http');
const router = require('./routes/api/v1/index.js');
const errorHandler = require('./middlewares/errorHandler.js');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());

app.use('/api/v1', router);

const server = http.createServer(app);

server.listen(process.env.PORT, () => {
  console.log('Server is live');
});

app.use((req, res) => {
  res.status(404).sendFile(`${__dirname}/template404/index.html`);
});

app.use(errorHandler);

module.exports = { server, app };
