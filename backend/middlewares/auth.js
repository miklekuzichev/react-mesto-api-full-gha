const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../utils/errors/UnauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers; // авторизационный заголовок
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Необходима авторизация!');
  }

  const token = authorization.replace('Bearer ', ''); // извлекаем токен из заголовка
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : '74c996b93e60225322df59ea8742655c655b6a63562e9181812f2855aafaa2ede');
  } catch (err) {
    throw new UnauthorizedError('Необходима авторизация!');
  }

  req.user = payload; // добавляем пейлоуд токена в объект запроса и вызываем next
  next(); // пропускаем запрос дальше
};
