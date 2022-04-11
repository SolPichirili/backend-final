const options = require("../../config");
const ContainerFs = require("../../containers/containerFs");

class UsersFsDaos extends ContainerFs {
    constructor() {
        super(options.file.usersPath);
    }
}

module.exports = UsersFsDaos;