const options = require("../../config");
const ContainerFs = require("../../containers/containerFs");

class ChatFsDaos extends ContainerFs {
    constructor() {
        super(options.file.chatPath);
    }
}

module.exports = ChatFsDaos;