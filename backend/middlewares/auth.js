const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { JWT_SECRET = 'dev-secret' } = process.env;

module.exports = (req, res, next) => {
  const jwtToken = req.cookies.jwt.replace('jwt=', '');

  let payload;

  try {
    payload = jwt.verify(jwtToken, JWT_SECRET);
    if (!payload) {
      throw new UnauthorizedError(`${jwtToken}`);
    }
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
<<<<<<< HEAD
      next(new UnauthorizedError('Необходима авторизация'));
=======
      throw new UnauthorizedError('плохой токен'); // Необходима авторизация
>>>>>>> 216fc0263cdc987e698ead433b03d8a9b66f17e9
    }
    next(new UnauthorizedError('Произошла ошибка'));
  }

  req.user = payload;

  next();
};
