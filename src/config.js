const path = require('path');

require('dotenv').config({
    path: path.resolve(process.cwd(), process.env.NODE_ENV + '.env')
});

const options = {
    port: process.env.PORT,

    persistance: process.env.PERS,

    admin: process.env.ADMIN,

    mode: process.env.MODE_SERVER,

    mongodb: {
        url: process.env.MONGO_URL,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    },

    file: {
        productsPath: __dirname + '/data/products.json',
        cartPath: __dirname + '/data/cart.json',
        chatPath: __dirname + '/data/messages.json',
        usersPath: __dirname + '/data/users.json',
        ordersPath: __dirname + '/data/orders.json'
    },

    secretOrKey: process.env.SECRET_OR_KEY,

    tokenExpiration: process.env.TOKEN_EXPIRATION,

    nodemailerMail: process.env.NODEMAILER_MAIL,

    nodemailerPassword: process.env.NODEMAILER_PASSWORD
}


module.exports = options;