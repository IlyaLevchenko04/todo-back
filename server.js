const { server } = require('./app');
const mongoose = require('mongoose');

mongoose.connect(`${process.env.DB_HOST}`).then(() => {
  console.log('Connected to MongoDB');
});
