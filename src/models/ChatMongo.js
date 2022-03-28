const { Schema, model } = require('mongoose');

const ChatMongo = new Schema({
    email: { type: String, required: true },
    type: {type: String, required: true},
    date: {type:String, required: true},
    message: {type:String, required:true}
});

module.exports = model('mensajes', ChatMongo);