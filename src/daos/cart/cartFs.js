const options = require("../../config");
const ContainerFs = require("../../containers/containerFs");

class CartFsDaos extends ContainerFs {
    constructor() {
        super(options.file.cartPath);
    }
}

module.exports = CartFsDaos;