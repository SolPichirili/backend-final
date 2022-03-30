const express = require('express');
const authController = require('../controllers/auth');
const passport = require('passport');

const authRouter = express.Router();

authRouter.get('/', authController.getLogin);

authRouter.get('/failLogin', authController.failLogin);

authRouter.get('/logOut', authController.logOut);

authRouter.get('/register', authController.getRegister);

authRouter.get('/failRegister', authController.failRegister);

authRouter.post('/auth/local', passport.authenticate('jwt', { session: false }),
    (req, res)=>{
        res.send(req.user.profile)
    });

authRouter.post('/signin/local', passport.authenticate('register', { failureRedirect: '/failRegister' }),
    authController.redirectLogin);


module.exports = authRouter;