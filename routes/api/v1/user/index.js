const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { createUser } = require('../../../../services/userServices/index');
const { userJoiSchema } = require('../../../../schemas/userSchema/index');
const { CustomError, errorsEnum } = require('../../../../errors');

router.post(
  '/signup',
  asyncHandler(async (req, res, next) => {
    try {
      const { error } = userJoiSchema.validate(req.body);

      if (error) {
        throw new CustomError(errorsEnum.VALIDATION_ERROR);
      }

      const result = await createUser(req.body);
      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  })
);

module.exports = router;
