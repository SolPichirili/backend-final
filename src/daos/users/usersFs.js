const options = require("../../config");
const ContainerFs = require("../../containers/ContainerFs");

class UsersFsDaos extends ContainerFs {
    constructor() {
        super(options.file.usersPath);
    }
}

module.exports = UsersFsDaos;