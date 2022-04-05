const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { getUser, createUser } = require('../../controllers/users');
const sendMail = require('../../utils/nodemailer');
const logger = require('../../utils/winston');
const JWTStrategy = require('passport-jwt').Strategy;
const options = require('../../config');
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use('signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
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

        const hash = await bcrypt.hash(password, 10);
        newUser.password = hash;

        const user = await createUser(newUser);

        await sendMail(user);

        logger.info('Successfull registration');

        return done(null, user);
    }
    catch (error) {
        done(error);
    }
}));

passport.use('login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        const user = await getUser(email);

        if (!user) {
            logger.error('User not found');
            return done(null, false);
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            logger.error('Invalid Password');
            return done(null, false);
        }

        logger.info('Successful login');
        return done(null, user);
    }
    catch (error) {
        return done(error);
    }
}));

passport.use(new JWTStrategy({
    secretOrKey: options.secretOrKey,
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
}, async (token, done) => {
    try {
        return done(null, token.user);
    }
    catch (error) {
        done(error);
    }
}))

module.exports = passport;