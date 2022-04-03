const { Schema, model } = require('mongoose');

const OrderMongo = new Schema({
    email: { type: String, required: true },
    products: {type: Array, default: [] },
    orderNumber: {type: Number, required: true},
    date: {type: String, default: new Date().toLocaleString()},
    state: {type: String, default: 'generated', required: true}
});

module.exports = model('ordenes', OrderMongo);