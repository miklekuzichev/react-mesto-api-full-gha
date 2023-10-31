const Card = require('../models/card');
const { STATUS_CODES } = require('../utils/constants');
const NotFoundError = require('../utils/errors/NotFoundError');
const BadRequestError = require('../utils/errors/BadRequestError');
const ForbiddenError = require('../utils/errors/ForbiddenError');

//
// Функция получения карточек
//
module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(STATUS_CODES.OK).send({ cards }))
    .catch(next);
};

//
// Функция создания карточек
//
module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  return Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(STATUS_CODES.CREATED).send({ card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Введены некорректные данные при создании карточки'));
      }
      return next(err);
    });
};

//
// Функция удаления карточки
//
module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
  .then((card) => {
    if (!card) {
      throw new NotFoundError('Карточка не найдена');
    }
    if (card.owner.toString() !== req.user._id) {
      throw new ForbiddenError('Нет прав на удаление карточки');
    }
    Card.deleteOne(card)
      .then(() => res.send({ message: 'Карточка удалена' }))
      .catch((err) => {
        if (err.name === 'DocumentNotFoundError') {
          return next(new NotFoundError('Передан несуществующий _id карточки'));
        } else if (err.name === 'CastError') {
          return next(new BadRequestError('Введены некорректные данные'));
        }
        return next(err);
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        return next(new BadRequestError('Введены некорректные данные'));
      }
      return next(err);
    });
};

//
// Контроллер постановки лайка
//
module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail()
    .then((card) => {
      res.status(STATUS_CODES.OK).send(card);
    })
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return next(new NotFoundError('Передан несуществующий _id карточки'));
      } else if (err.name === 'CastError') {
        return next(new BadRequestError('Переданы некорректные данные для постановки лайка'));
      }
      return next(err);
    });
};

//
// Контроллер удаления лайка
//
module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .orFail()
    .then((card) => {
      res.status(STATUS_CODES.OK).send(card);
    })
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return next(new NotFoundError('Передан несуществующий _id карточки'));
      } else if (err.name === 'CastError') {
        return next(new BadRequestError('Переданы некорректные данные для снятия лайка'));
      }
      return next(err);
    });
};
