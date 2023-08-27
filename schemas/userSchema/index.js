const mongoose = require('mongoose');
const Joi = require('joi');

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    createDate: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

const userJoiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().min(8).required(),
});

const User = mongoose.model('User', userSchema);

module.exports = {
  User,
  userJoiSchema,
};
