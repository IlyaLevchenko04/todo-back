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
const { isValidObjId } = require('../../../../middlewares/isValidObjId');
const router = express.Router();

/**
 * @openapi
 * /todos:
 *   get:
 *     tags:
 *       - Todos
 *     summary: get all todos.
 *     description: Method for getting all todos.
 *     responses:
 *       200:
 *         description: Returns all todos in category.
 */

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

/**
 * @openapi
 * /todos/:id:
 *   get:
 *     tags:
 *       - Todos
 *     summary: get one todo by id.
 *     description: Method for getting one todo by id.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Returns one todo.
 *       404:
 *         description: not found.
 *
 */

router.get(
  '/:id',
  isValidObjId,
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

/**
 * @openapi
 * /todos:
 *   post:
 *     tags:
 *       - Todos
 *     summary: create todo.
 *     description: Method for creating todo.
 *     parameters:
 *       - in: body
 *         name: title
 *         required: true
 *       - in: body
 *         name: text
 *         required: true
 *       - in: body
 *         name: isDone
 *         required: true
 *     responses:
 *       201:
 *         description: Returns created todo.
 */

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

/**
 * @openapi
 * /todos/:id:
 *   put:
 *     tags:
 *       - Todos
 *     summary: update one todo by id.
 *     description: Method for updating one todo by id.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *       - in: body
 *         name: title
 *         required: true
 *       - in: body
 *         name: text
 *         required: true
 *       - in: body
 *         name: isDone
 *         required: true
 *     responses:
 *       200:
 *         description: Returns updated todo.
 *       404:
 *         description: not found.
 */

router.put(
  '/:id',
  auth,
  isValidObjId,
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

/**
 * @openapi
 * /todos/:id:
 *   delete:
 *     tags:
 *       - Todos
 *     summary: delete one todo by id.
 *     description: Method for deleting one todo by id.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Returns deleted todo.
 *
 *       404:
 *         description: not found.
 */

router.delete(
  '/:id',
  auth,
  isValidObjId,
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
