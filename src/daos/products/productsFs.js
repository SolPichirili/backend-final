const options = require("../../config");
const ContainerFs = require("../../containers/containerFs");

class ProductsFsDaos extends ContainerFs {
    constructor() {
        super(options.file.productsPath);
    }
}

module.exports = ProductsFsDaos;