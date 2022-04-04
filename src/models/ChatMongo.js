const { Schema, model } = require('mongoose');

const ChatMongo = new Schema({
    email: { type: String, required: true },
    type: {type: String, default: 'client'},
    date: {type:String, default: new Date().toLocaleString(), required: true},
    message: {type:String, required:true}
});

module.exports = model('mensajes', ChatMongo);