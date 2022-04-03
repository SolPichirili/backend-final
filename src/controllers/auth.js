const passport = require('passport');
const jwt = require('jsonwebtoken');
const logger = require('../utils/winston');

const signUp = [
    passport.authenticate('signup', { session: false }),
        async (req, res, next) => {
            logger.info(`PATH: ${req.path}, METHOD: ${req.method}, process ok`);
            res.redirect('/productos');
        }
];

const login = async (req, res, next) => {
    passport.authenticate(
        'login', 
        async (err, user, info) => {
        try {

            if (err || !user) {
                logger.error(`Error de login: ${err}`);
                res.render('../src/views/pages/failLogin.ejs');
                return next(err);
            }

            req.login(user,
                { session: false },
                async (error) => {
                    if (error) {
                        logger.error(`Error de login: ${err}`);
                        return next(error);
                    }

                    const body = { _id: user._id, email: user.email };
                    jwt.sign({ user: body }, process.env.SECRET_OR_KEY);
                }
            );

            return res.redirect('/productos');
        }
        catch (error) {
            logger.error(`Error de login: ${err}`);
            return next(error);
        }
    })(req, res, next);
}

const getProfile = () => {
    passport.authenticate('jwt', {
        session: false
    }),
        (req, res, next) => {
            res.json({user: req.user});
        }
}

const getLogin = (req, res) => {
    res.render(`../src/views/pages/login.ejs`)
}

const logOut = (req, res) => {
    req.session.destroy(err => {
        if (!err) {
            res.render('../src/views/pages/logOut.ejs');
        } else {
            logger.error(`Error log out: ${err}`);
            res.redirect('../src/views/pages/login.ejs');
        }
    });
}

const getRegister = (req, res) => {
    res.render('../src/views/pages/register.ejs');
}

const failRegister = (req, res) => {
    res.render('../src/views/pages/failRegister.ejs');
}

module.exports = {
    signUp,
    login,
    getProfile,
    getLogin,
    logOut,
    getRegister,
    failRegister
}