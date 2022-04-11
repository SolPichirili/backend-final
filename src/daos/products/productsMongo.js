const ContainerMongo = require("../../containers/containerMongo");
const ProductMongo = require('../../models/ProductMongo');

class ProductsMongoDaos extends ContainerMongo {
    constructor() {
        super(ProductMongo);
    }
}

module.exports = ProductsMongoDaos;