const { Schema, model } = require('mongoose');

const UserMongo = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String },
    address: { type: String },
    age: { type: Number },
    tel: { type: String }
});

module.exports = model('usuarios', UserMongo);