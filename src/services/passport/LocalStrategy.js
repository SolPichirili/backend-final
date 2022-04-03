const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const { sendMail } = require('../../utils/nodemailer');
const logger = require('../../utils/winston');
const JwtStrategy = require('passport-jwt').Strategy;
const { isValidPassword, createHash } = require('../../utils/bCrypt');
const { getUser, createUser } = require('../../controllers/users');

const options = {
    secretOrKey: process.env.SECRET_OR_KEY,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

const registerStrategy = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},
    async (req, email, password, done) => {
        try {
            const { name, address, age, tel } = req.body;

            const newUser = {
                email,
                password,
                name,
                address,
                age,
                tel
            }
            
                const hash = createHash(password);
                newUser.password = hash;

                const userCreated = await createUser(newUser);

                await sendMail(userCreated);

                logger.info('Registration succesfully');

                return done(null, userCreated);
        }
        catch (error) {
           return done(error);
        }
    }
);

const loginStrategy = new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    async (email, password, done) => {
        try {
            const user = await getUser(email);

            if (!user) {
                logger.error('User not found');
                return done(null, false);
            }

            if (!isValidPassword(user, password)) {
                logger.error('Invalid Password');
                return done(null, false);
            }

            logger.info('Login succesfully')
            return done(null, user);
        }
        catch (error) {
            return done(error);
        }
    }
);

const jwtStrategy = new JwtStrategy(options,
    async (token, done) => {
        try {
            return done(null, token.user);
        }
        catch (error) {
            return done(error);
        }
    }
);

const serializeUser = (user, cb) => {
    cb(null, user);
};

const deserializeUser = (obj, cb) => {
    cb(null, obj);
}

module.exports = {
    loginStrategy,
    registerStrategy,
    jwtStrategy,
    serializeUser,
    deserializeUser
}

