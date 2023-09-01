const express = require('express');
const asyncHandler = require('express-async-handler');
const { todoJoiSchema } = require('../../../../schemas/todoSchema/index');
const {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
} = require('../../../../services/todosServices');
const { CustomError, errorsEnum } = require('../../../../errors/index');
const { auth } = require('../../../../middlewares/auth');
const router = express.Router();

router.get(
  '/',
  asyncHandler(async (req, res, next) => {
    try {
      const data = await getAllTodos();

      return res.json(data);
    } catch (error) {
      next(error);
    }
  })
);

router.get(
  '/:id',
  asyncHandler(async (req, res, next) => {
    try {
      const { id } = req.params;

      const data = await getTodoById(id);

      return res.json(data);
    } catch (error) {
      next(error);
    }
  })
);

router.post(
  '/',
  auth,
  asyncHandler(async (req, res, next) => {
    try {
      const { error } = todoJoiSchema.validate(req.body);

      if (error) {
        throw new CustomError(errorsEnum.VALIDATION_ERROR);
      }

      const data = await createTodo(req.body);

      return res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  })
);

router.put(
  '/:id',
  auth,
  asyncHandler(async (req, res, next) => {
    try {
      const { error } = todoJoiSchema.validate(req.body);

      if (error) {
        throw new CustomError(errorsEnum.VALIDATION_ERROR);
      }

      const data = await updateTodo(req.body, req.params.id);

      return res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  })
);

router.delete(
  '/:id',
  auth,
  asyncHandler(async (req, res, next) => {
    try {
      const data = await deleteTodo(req.params.id);

      return res.json(data);
    } catch (error) {
      next(error);
    }
  })
);

module.exports = router;
