const CartFsDaos = require('./cart/cartFs');
const CartMemDaos = require('./cart/cartMem');
const CartMongoDaos = require('./cart/cartMongo');
const ProductsFsDaos = require('./products/productsFs');
const ProductsMemDaos = require('./products/productsMem');
const ProductsMongoDaos = require('./products/productsMongo');
const ChatFsDaos = require('./chat/chatFs');
const ChatMemDaos = require('./chat/chatMem');
const ChatMongoDaos = require('./chat/chatMongo');

class PersistenceFactory {
    getPersistenceMethod(pers) {
        switch (pers) {

            case 'fs':
                return {
                    productsDao: new ProductsFsDaos(),
                    cartDao: new CartFsDaos(),
                    chatDao: new ChatFsDaos()
                }

            case 'memory':
                return {
                    productsDao: new ProductsMemDaos(),
                    cartDao: new CartMemDaos(),
                    chatDao: new ChatMemDaos()
                }
            default:
                return {
                    productsDao: new ProductsMongoDaos(),
                    cartDao: new CartMongoDaos(),
                    chatDao: new ChatMongoDaos()
                }
        }
    }

    static getInstance() {
        if (!PersistenceFactory.instance) {
            PersistenceFactory.instance = new PersistenceFactory();
        }

        return PersistenceFactory.instance;
    }
}

module.exports = PersistenceFactory;