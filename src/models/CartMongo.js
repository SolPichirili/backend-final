const { Schema, model } = require('mongoose');

const CartMongo = new Schema({
    products: { type: Array, default: [] },
    timestamp: { type: Date, default: Date.now(), required: true }
});

module.exports = model('carritos', CartMongo);