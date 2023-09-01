const uuid = require('uuid').v4;
const jwt = require('jsonwebtoken');
const { CustomError, errorsEnum } = require('../../errors');
const { RefreshToken } = require('../../schemas/refreshTokenSchema/index');
require('dotenv').config();

const tokenTypesEnum = {
  ACCESS: 'access',
  REFRESH: 'refresh',
};

const authConfig = {
  secret: process.env.SECRET_KEY,
  tokens: {
    access: {
      type: tokenTypesEnum.ACCESS,
      expiresIn: '12h',
    },
    refresh: {
      type: tokenTypesEnum.REFRESH,
      expiresIn: '1d',
    },
  },
};

const generateAccessToken = (userId, payload) => {
  const data = {
    userId,
    type: authConfig.tokens.access.type,
    ...payload,
  };
  const options = { expiresIn: authConfig.tokens.access.expiresIn };

  return jwt.sign(data, authConfig.secret, options);
};

const generateRefreshToken = () => {
  const payload = {
    id: uuid(),
    type: authConfig.tokens.refresh.type,
  };
  const options = { expiresIn: authConfig.tokens.refresh.expiresIn };

  return {
    id: payload.id,
    token: jwt.sign(payload, authConfig.secret, options),
  };
};

const replaceRefreshTokenFromStorage = async (tokenId, userId) => {
  await RefreshToken.deleteOne({ userId });

  await RefreshToken.create({ tokenId, userId });
};

const updateTokens = async (userId, payload) => {
  const accessToken = generateAccessToken(userId, payload);
  const refreshToken = generateRefreshToken();

  await replaceRefreshTokenFromStorage(refreshToken.id, userId);

  return {
    accessToken,
    refreshToken: refreshToken.token,
  };
};

const createNewPairOfTokens = async refreshToken => {
  const { id: tokenId, type } = jwt.verify(
    refreshToken,
    process.env.SECRET_KEY
  );

  if (type !== tokenTypesEnum.REFRESH) {
    throw new CustomError(errorsEnum.UNAUTHORIZED);
  }

  const refreshOldTokens = await RefreshToken.findOne({ tokenId });

  if (!refreshOldTokens) {
    throw new CustomError(errorsEnum.UNAUTHORIZED);
  }

  const newTokens = await updateTokens(refreshOldTokens.userId);

  return newTokens;
};

module.exports = {
  generateAccessToken,
  replaceRefreshTokenFromStorage,
  generateRefreshToken,
  updateTokens,
  tokenTypesEnum,
  createNewPairOfTokens,
};
