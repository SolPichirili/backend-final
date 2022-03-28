const ContainerMongo = require("../../containers/ContainerMongo");
const ChatMongo = require('../../models/ChatMongo');

class ChatMongoDaos extends ContainerMongo {
    constructor() {
        super(ChatMongo);
    }
}

module.exports = ChatMongoDaos;