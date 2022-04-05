const passport = require('passport');
const jwt = require('jsonwebtoken');
const logger = require('../utils/winston');
const options = require('../config');

const getProfile = [
    passport.authenticate('jwt', {
        session: false
    }),
    (req, res, next) => {
        res.json({
            user: req.user
        });
    }
];

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
                    const error = new Error('new Error')
                    return next(error);
                }

                req.login(user,
                    { session: false },
                    async (err) => {

                        if (err) return next(err);
                        const body = { _id: user._id, email: user.email };
                        const token = jwt.sign({ user: body }, options.secretOrKey, { expiresIn: options.tokenExpiration });
                    }
                )

                res.redirect('/productos');
            }
            catch (error) {
                return next(error);
            }
        })(req, res, next)
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

module.exports = {
    signUp,
    login,
    getProfile,
    getLogin,
    logOut,
    getRegister
}