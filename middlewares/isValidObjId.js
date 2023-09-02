const { CustomError, errorsEnum } = require('../errors/index');

const ObjectId = require('mongoose').Types.ObjectId;

async function isValidObjId(req, res, next) {
  try {
    const { id } = req.params;

    const isIdValid = ObjectId.isValid(id);

    if (!isIdValid) {
      throw new CustomError(errorsEnum.INVALID_OBJ_ID);
    }

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = { isValidObjId };
