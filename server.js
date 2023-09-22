const { server } = require('./app');
const mongoose = require('mongoose');
require('dotenv').config();

mongoose
  .connect(
    `mongodb+srv://IlyaLevchenko:45HOIv5ejHF4mWMY@contactsdb.hlihyqp.mongodb.net/todo?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log('Connected to MongoDB');
  });
