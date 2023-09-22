const { server } = require('./app');
const mongoose = require('mongoose');
require('dotenv').config({ path: __dirname + '/.env' });

const { DB_HOST } = process.env;
mongoose.connect(DB_HOST).then(() => {
  console.log('Connected to MongoDB');
});
