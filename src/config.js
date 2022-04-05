const path = require('path');

require('dotenv').config({
    path: './production.env'
});

const options = {
    port: process.env.PORT,

    mongodb: {
        url: process.env.MONGO_URL,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000
        }
    },

    file: {
        productsPath: __dirname + '/data/products.json',
        cartPath: __dirname + '/data/cart.json',
        chatPath: __dirname + '/data/messages.json',
        usersPath: __dirname + '/data/users.json',
        ordersPath: __dirname + '/data/orders.json'
    }
}


module.exports = options;