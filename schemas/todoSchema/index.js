const mongoose = require('mongoose');
const Joi = require('joi');

const Schema = mongoose.Schema;

const todoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    isDone: {
      type: Boolean,
      default: false,
      required: true,
    },
    createDate: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

const todoJoiSchema = Joi.object({
  title: Joi.string().required(),
  text: Joi.string().required(),
  isDone: Joi.boolean().required(),
});

const Todo = mongoose.model('Todos', todoSchema);

module.exports = {
  Todo,
  todoJoiSchema,
};
