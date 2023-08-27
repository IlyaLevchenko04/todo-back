const { User } = require('../../schemas/userSchema/index');
const { CustomError, errorsEnum } = require('../../errors/index');
const { updateTokens } = require('../../helpers/refreshToken/index');
const bcrypt = require('bcrypt');

const createUser = async ({ name, email, password }) => {
  const isEmailUniqe = await User.findOne({ email });

  if (isEmailUniqe) {
    throw new CustomError(errorsEnum.EMAIL_IN_USE);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    name,
    email,
    password: hashedPassword,
  };

  const data = await User.create(newUser);

  return data;
};

const signIn = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError(errorsEnum.EMAIL_OR_PASS_IS_WRONG);
  }

  const isPasswordTrue = await bcrypt.compare(password, user.password);

  if (!isPasswordTrue) {
    throw new CustomError(errorsEnum.EMAIL_OR_PASS_IS_WRONG);
  }

  const { _id: id } = user;

  const tokens = await updateTokens(id, { userId: id });

  const loggedInUser = await User.findById(id);

  return {
    loggedInUser,
    tokens,
  };
};

module.exports = { createUser, signIn };
