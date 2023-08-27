const { server } = require('./app');
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_HOST).then(() => {
  console.log('Connected to MongoDB');
});
// .then(() => {
//   server.listen(process.env.PORT, () => {
//     console.log('Database connection successful');
//   });
// })
// .catch(err => {
//   console.log(err.message);
//   process.exit(1);
// });
