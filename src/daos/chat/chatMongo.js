const ContainerMongo = require("../../containers/containerMongo");
const ChatMongo = require('../../models/ChatMongo');

class ChatMongoDaos extends ContainerMongo {
    constructor() {
        super(ChatMongo);
    }
}

module.exports = ChatMongoDaos;