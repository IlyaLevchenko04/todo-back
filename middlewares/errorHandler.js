const { errors: ERRORS, CustomError } = require('../errors/index');

const errorHandler = (error, req, res, next) => {
  try {
    if (error instanceof CustomError) {
      const { id, message, code } = ERRORS[error.message](error.params);

      return res.status(code || 400).send({
        error: {
          id,
          message,
        },
        data: null,
      });
    }

    if (error.type === 'entity.parse.failed') {
      return res.status(error.statusCode).send({
        error: {
          id: 'INVALID_JSON',
          message: error.message,
        },
        data: null,
      });
    }

    return res.status(500).send({
      error: ERRORS.SERVER_ERROR(error),
      data: null,
    });
  } catch (error) {
    return res.status(500).send({
      error: ERRORS.SERVER_ERROR(error),
      data: null,
    });
  }
};

module.exports = errorHandler;
