const options = require("../../config");
const ContainerFs = require("../../containers/ContainerFs");

class OrdersFsDaos extends ContainerFs {
    constructor() {
        super(options.file.ordersPath);
    }
}

module.exports = OrdersFsDaos;