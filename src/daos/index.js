const CartFsDaos = require('./cart/cartFs');
const CartMemDaos = require('./cart/cartMem');
const CartMongoDaos = require('./cart/cartMongo');
const ProductsFsDaos = require('./products/productsFs');
const ProductsMemDaos = require('./products/productsMem');
const ProductsMongoDaos = require('./products/productsMongo');
const ChatFsDaos = require('./chat/chatFs');
const ChatMemDaos = require('./chat/chatMem');
const ChatMongoDaos = require('./chat/chatMongo');
const UsersFsDaos = require('./users/usersFs');
const UsersMemDaos = require('./users/usersMem');
const UsersMongoDaos = require('./users/usersMongo');
const OrdersFsDaos = require('./orders/ordersFs');
const OrdersMemDaos = require('./orders/ordersMem');
const OrdersMongoDaos = require('./orders/ordersMongo');

class PersistenceFactory {
    getPersistenceMethod(pers) {
        switch (pers) {

            case 'fs':
                return {
                    productsDao: new ProductsFsDaos(),
                    cartDao: new CartFsDaos(),
                    chatDao: new ChatFsDaos(),
                    usersDao: new UsersFsDaos(),
                    ordersDao: new OrdersFsDaos()
                }

            case 'memory':
                return {
                    productsDao: new ProductsMemDaos(),
                    cartDao: new CartMemDaos(),
                    chatDao: new ChatMemDaos(),
                    usersDao: new UsersMemDaos(),
                    ordersDao: new OrdersMemDaos()
                }
            default:
                return {
                    productsDao: new ProductsMongoDaos(),
                    cartDao: new CartMongoDaos(),
                    chatDao: new ChatMongoDaos(),
                    usersDao: new UsersMongoDaos(),
                    ordersDao: new OrdersMongoDaos()
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