const options = require("../../config");
const ContainerFs = require("../../containers/ContainerFs");

class ChatFsDaos extends ContainerFs {
    constructor() {
        super(options.file.chatPath);
    }
}

module.exports = ChatFsDaos;