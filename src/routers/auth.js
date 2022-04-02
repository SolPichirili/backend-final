const express = require('express');
const authController = require('../controllers/auth');


const authRouter = express.Router();

authRouter.get('/', authController.getLogin);

authRouter.post('/', authController.login);

authRouter.get('/profile', authController.getProfile);

authRouter.get('/logOut', authController.logOut);

authRouter.get('/signup', authController.getRegister);

authRouter.get('/failRegister', authController.failRegister);

authRouter.post('/signup', authController.signUp);


module.exports = authRouter;