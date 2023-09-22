const { server } = require('./app');
const mongoose = require('mongoose');
require('dotenv').config({ path: __dirname + '/.env' });

mongoose.connect(`${process.env.DB_HOST}`).then(() => {
  console.log('Connected to MongoDB');
});
