const passport = require('passport');
const {loginStrategy, registerStrategy, jwtStrategy} = require('../passport/LocalStrategy');

passport.use(jwtStrategy);

passport.use('login', loginStrategy);

passport.use('signup', registerStrategy);

module.exports = passport;