const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const {
  createUser,
  signIn,
} = require('../../../../services/userServices/index');
const {
  userJoiSchema,
  userSignInSchema,
} = require('../../../../schemas/userSchema/index');
const { CustomError, errorsEnum } = require('../../../../errors');
const { auth } = require('../../../../middlewares/auth');
const { RefreshToken } = require('../../../../schemas/refreshTokenSchema');
const { createNewPairOfTokens } = require('../../../../helpers/refreshToken');

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

router.post(
  '/signin',
  asyncHandler(async (req, res, next) => {
    try {
      const { error } = userSignInSchema.validate(req.body);

      if (error) {
        throw new CustomError(errorsEnum.VALIDATION_ERROR);
      }

      const result = await signIn(req.body);

      return res.json(result);
    } catch (error) {
      next(error);
    }
  })
);

router.post(
  '/logout',
  auth,
  asyncHandler(async (req, res, next) => {
    try {
      const { _id: id } = req.user;

      await RefreshToken.findOneAndDelete({ userId: id });

      return res.json('Logout success');
    } catch (error) {
      next(error);
    }
  })
);

router.post(
  '/refreshTokens',
  auth,
  asyncHandler(async (req, res, next) => {
    try {
      const tokens = await createNewPairOfTokens(req.body.refreshToken);

      res.json(tokens);
    } catch (error) {
      next(error);
    }
  })
);

module.exports = router;
