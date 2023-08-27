const errorsEnum = require('./errorsEnum');

const ERRORS = {
  VALIDATION_ERROR: msg => {
    return {
      id: errorsEnum.VALIDATION_ERROR,
      message: msg,
      code: 415,
    };
  },
  TODO_NOT_FOUND: id => {
    return {
      id: errorsEnum.TODO_NOT_FOUND,
      message: `Todo with provided id(${id}) not found`,
      code: 404,
    };
  },
  CATEGORY_NOT_FOUND: id => {
    return {
      id: errorsEnum.CATEGORY_NOT_FOUND,
      message: `Category with provided id(${id}) not found`,
      code: 404,
    };
  },
  SERVER_ERROR: error => {
    return {
      id: errorsEnum.SERVER_ERROR,
      message: `Something went wrong: ${error.message}`,
      code: 500,
    };
  },
  UNAUTHORIZED: () => {
    return {
      id: errorsEnum.UNAUTHORIZED,
      message: `Unauthorized`,
      code: 401,
    };
  },
  EMAIL_OR_PASS_IS_WRONG: () => {
    return {
      id: errorsEnum.EMAIL_OR_PASS_IS_WRONG,
      message: `Email or password is wrong`,
      code: 401,
    };
  },
  EMAIL_IN_USE: () => {
    return {
      id: errorsEnum.EMAIL_IN_USE,
      message: `Email in use`,
      code: 409,
    };
  },
  TOKEN_EXPIRED: () => {
    return {
      id: errorsEnum.TOKEN_EXPIRED,
      message: `Token expired`,
      code: 401,
    };
  },
  INVALID_TOKEN: () => {
    return {
      id: errorsEnum.INVALID_TOKEN,
      message: `Invalid token`,
      code: 401,
    };
  },
  MONO_API_ERROR: () => {
    return {
      id: errorsEnum.MONO_API_ERROR,
      message: `Mono API error`,
      code: 500,
    };
  },
  INVALID_OBJ_ID: () => {
    return {
      id: errorsEnum.INVALID_OBJ_ID,
      message: `Invalid ObjectId`,
      code: 500,
    };
  },
};

module.exports = ERRORS;
