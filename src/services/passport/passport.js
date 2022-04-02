const passport = require('passport');
const {loginStrategy, registerStrategy, jwtStrategy, serializeUser, deserializeUser} = require('../passport/LocalStrategy');

passport.use('login', loginStrategy);

passport.use('signup', registerStrategy);

passport.use('jwt', jwtStrategy);

passport.serializeUser(serializeUser);

passport.deserializeUser(deserializeUser);

module.exports = passport;