const { User } = require('../schemas/userSchema/index');
const jwt = require('jsonwebtoken');
const { tokenTypesEnum } = require('../helpers/refreshToken/index');

async function auth(req, res, next) {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');

  try {
    if (bearer !== 'Bearer' || !token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { userId, type } = jwt.verify(token, process.env.SECRET_KEY);

    if (type !== tokenTypesEnum.ACCESS) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = await User.findById(userId);

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = { auth };
