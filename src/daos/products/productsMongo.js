const ContainerMongo = require("../../containers/ContainerMongo");
const ProductMongo = require('../../models/ProductMongo');

class ProductsMongoDaos extends ContainerMongo {
    constructor() {
        super(ProductMongo);
    }
}

module.exports = ProductsMongoDaos;