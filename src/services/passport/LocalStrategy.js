const Strategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../../models/User');
const logger = require('../../utils/winston');
const { isValidPassword, createHash } = require('../../utils/bCrypt');
const { send } = require('../../utils/nodemailer');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secret'
}

const loginStrategy = new Strategy(options, (jwt_payload, done) => {
    User.findOne({ id: jwt_payload }, (err, user) => {
        if (err) {
            return done(err);
        }

        if (!user) {
            logger.error('User not found');
            return done(null, false);
        }

        if (!isValidPassword(user, password)) {
            logger.error('Invalid Password');
            return done(null, false);
        }

        return done(null, user)
    })
});

const registerStrategy = new Strategy(options, { passReqToCallback: true },
    (req, username, password, done) => {
        User.findOne({ email: username }, (err, user) => {
            if (err) {
                logger.error(`Error ${err}`);
                return done(err);
            }

            if (user) {
                logger.error('User already exists');
                return done(null, false);
            }

            const newUser = {
                username: username,
                password: createHash(password),
                repeatPassword: createHash(password),
                email: req.body.username,
                name: req.body.name,
                address: req.body.address,
                age: req.body.age,
                tel: req.body.tel,
                img: req.body.photo
            }

            if (newUser.tel.includes('+549') || newUser.password === newUser.repeatPassword ) {
                User.create(newUser, (err, userCreated) => {
                    if (err) {
                        logger.error(`Error ${err}`);
                        return done(err);
                    }

                    logger.info('Successful registration');
                    send(`Nuevo registro de ${userCreated}`);
                    return done(null, userCreated);
                });
            } else {
                logger.error('Error with Phone');
                return done(null, false);
            }
        })
    });

const serializeUser = (user, cb) => {
    cb(null, user);
};

const deserializeUser = (obj, cb) => {
    cb(null, obj);
}


module.exports = {
    loginStrategy,
    registerStrategy,
    serializeUser,
    deserializeUser
}