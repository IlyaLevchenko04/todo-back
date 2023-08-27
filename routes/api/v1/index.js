const todosRouter = require('./todos/index');
const userRouter = require('./user/index');
const express = require('express');
const router = express.Router();

router.use('/todos', todosRouter);

router.use('/user', userRouter);

module.exports = router;
