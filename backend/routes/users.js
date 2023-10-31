const userRouter = require('express').Router();

const {
  getUsers,
  getUserById,
  findUser,
  updateUserProfile,
  updateUserAvatar,
} = require('../controllers/users');

const {
  userIdValidate,
  userDataValidate,
  userAvatarValidate,
} = require('../middlewares/validation');

userRouter.get('/users', getUsers);
userRouter.get('/users/me', findUser); // возвращаем информацию о текущем пользователе
userRouter.get('/users/:userId', userIdValidate, getUserById);
userRouter.patch('/users/me', userDataValidate, updateUserProfile);
userRouter.patch('/users/me/avatar', userAvatarValidate, updateUserAvatar);

module.exports = userRouter;
