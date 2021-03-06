const { Schema, model } = require('mongoose');

const ProductMongo = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: Number, required: true },
    photo: { type: String, required: true },
    price: { type: String, required: true },
    stock: { type: String, required: true },
    category: { type: String, required: true },
    quantity: {type: Number, default: 0}
});

module.exports = model('productos', ProductMongo);