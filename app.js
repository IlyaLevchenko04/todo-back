const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const swaggerUI = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const http = require('http');
const router = require('./routes/api/v1/index.js');
const errorHandler = require('./middlewares/errorHandler.js');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());

const swaggerOptions = {
  customCss: '.swagger-ui .topbar { display: none }',
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Todo API Specification',
      description: 'This routes allow to manipulate with todos and users.',
      contact: {
        name: 'API Support',
        email: 'nneo2086@gmail.com/',
      },
      version: '1.0',
    },
    servers: [
      {
        description: 'Public server (v1)',
        url: `https://products-api-umhe.onrender.com/api/v1/`,
      },
      {
        description: 'Test server (v1)',
        url: `http://localhost:${process.env.PORT}/api/v1/`,
      },
    ],
    schemes: ['https'],
  },
  apis: ['server.js', './routes/**/*.js'],
};
const apiSpecification = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(apiSpecification));

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
