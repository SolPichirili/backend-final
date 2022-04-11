const ContainerMongo = require("../../containers/containerMongo");
const OrderMongo = require('../../models/OrderMongo');

class OrdersMongoDaos extends ContainerMongo {
    constructor() {
        super(OrderMongo);
    }
}

module.exports = OrdersMongoDaos;