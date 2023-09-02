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

/**
 * @openapi
 * /signup:
 *   post:
 *     tags:
 *       - User
 *     summary: create user.
 *     description: Method for creating user. Required fields name, email, password.
 *     parameters:
 *       - in: body
 *         name: email
 *         required: true
 *       - in: body
 *         name: password
 *         required: true
 *       - in: body
 *         name: name
 *         required: true
 *     responses:
 *       201:
 *         description: Returns created user.
 *       409:
 *         description: email in use.
 *       400:
 *         description: missing fields.
 */

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

/**
 * @openapi
 * /signin:
 *   post:
 *     tags:
 *       - User
 *     summary: login in account of user.
 *     description: Method for login in account of user. Required fields email, password.
 *     parameters:
 *       - in: body
 *         name: email
 *         required: true
 *       - in: body
 *         name: password
 *         required: true
 *     responses:
 *       201:
 *         description: Returns logged user.
 *       400:
 *         description: missing fields.
 */

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

/**
 * @openapi
 * /logout:
 *   post:
 *     tags:
 *       - User
 *     summary: logout from account of user.
 *     description: Method for logout from account of user.
 *     responses:
 *       201:
 *         description: Returns messsage Logout success.
 */

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

/**
 * @openapi
 * /refreshTokens:
 *   post:
 *     tags:
 *       - User
 *     summary: refresh tokens .
 *     description: Method for refreshing tokens.
 *     parameters:
 *       - in: body
 *         name: refreshToken
 *         required: true
 *     responses:
 *       201:
 *         description: Returns new pair of tokens acsessToken, refreshToken.
 */

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
