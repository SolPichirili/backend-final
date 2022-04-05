const { Schema, model } = require('mongoose');

const OrderMongo = new Schema({
    email: { type: String },
    products: { type: Array, default: [] },
    date: { type: String, default: new Date().toLocaleString() },
    state: { type: String, default: 'generated', required: true }
});

module.exports = model('ordenes', OrderMongo);