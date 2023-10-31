const cardRouter = require('express').Router();

const {
  getCards,
  createCard,
  likeCard,
  dislikeCard,
  deleteCard,
} = require('../controllers/cards');

const {
  createCardValidate, cardIdValidate,
} = require('../middlewares/validation');

cardRouter.get('/cards', getCards);
cardRouter.post('/cards', createCardValidate, createCard);
cardRouter.put('/cards/:cardId/likes', cardIdValidate, likeCard);
cardRouter.delete('/cards/:cardId/likes', cardIdValidate, dislikeCard);
cardRouter.delete('/cards/:cardId', cardIdValidate, deleteCard);

module.exports = cardRouter;
