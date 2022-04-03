const express = require('express');
const authController = require('../controllers/auth');

const authRouter = express.Router();

authRouter.get('/', authController.getLogin);

authRouter.get('/profile', authController.getProfile);

authRouter.get('/logOut', authController.logOut);

authRouter.get('/signup', authController.getRegister);

authRouter.get('/failRegister', authController.failRegister);

authRouter.post('/signup', authController.signUp);

authRouter.post('/', authController.login);


module.exports = authRouter;