const { Todo } = require('../../schemas/todoSchema/index');
const { CustomError, errorsEnum } = require('../../errors/index');

const getAllTodos = async () => {
  const response = await Todo.find();

  return response;
};

const getTodoById = async id => {
  const response = await Todo.findById(id);

  if (!response) {
    throw new CustomError(errorsEnum.TODO_NOT_FOUND, id);
  }

  return response;
};

const createTodo = async ({ title, text, isDone }) => {
  const response = await Todo.create({ title, text, isDone });

  return response;
};

const updateTodo = async (data, id) => {
  const response = await Todo.findByIdAndUpdate(id, { ...data }, { new: true });

  if (!response) {
    throw new CustomError(errorsEnum.TODO_NOT_FOUND, id);
  }

  return response;
};

const deleteTodo = async id => {
  const response = await Todo.findByIdAndDelete(id);

  if (!response) {
    throw new CustomError(errorsEnum.TODO_NOT_FOUND, id);
  }

  return response;
};

module.exports = {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
};
