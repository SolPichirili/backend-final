const options = require("../../config");
const ContainerFs = require("../../containers/containerFs");

class OrdersFsDaos extends ContainerFs {
    constructor() {
        super(options.file.ordersPath);
    }
}

module.exports = OrdersFsDaos;