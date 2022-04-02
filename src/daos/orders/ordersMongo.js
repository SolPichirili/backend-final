const ContainerMongo = require("../../containers/ContainerMongo");
const OrderMongo = require('../../models/OrderMongo');

class OrdersMongoDaos extends ContainerMongo {
    constructor() {
        super(OrderMongo);
    }
}

module.exports = OrdersMongoDaos;