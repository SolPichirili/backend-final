const ContainerMongo = require("../../containers/ContainerMongo");
const CartMongo = require('../../models/CartMongo');

class CartMongoDaos extends ContainerMongo {
    constructor() {
        super(CartMongo);
    }
}

module.exports = CartMongoDaos;