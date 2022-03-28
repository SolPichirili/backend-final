const {Schema, model} = require('mongoose');

const CartMongo = new Schema({
    productos: { type: Array, default: [], required: true },
    timestamp: {type: Date, default: Date.now(), required: true}
});

module.exports = model('carritos', CartMongo);