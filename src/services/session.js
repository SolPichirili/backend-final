const session = require('express-session');
const MongoStore = require('connect-mongo');
const options = require('../config');

const sessionMongo = session({
    store: MongoStore.create({ mongoUrl: options.mongodb.url }),
    secret: process.env.SECRET_MONGO,
    resave: true,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 600000
    }
});

module.exports = sessionMongo;