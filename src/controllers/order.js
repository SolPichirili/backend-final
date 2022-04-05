const logger = require('../utils/winston');
const PersistenceFactory = require('../daos/index');
const { getPersistence } = require('../utils/getPersistence');
const { sendMail } = require('../utils/nodemailer');

const factory = PersistenceFactory.getInstance();

const OrderDao = factory.getPersistenceMethod(getPersistence()).ordersDao;
const CartDaos = factory.getPersistenceMethod(getPersistence()).cartDao;

const getOrder = (req, res) => {
    logger.info(`PATH: ${req.path}, METHOD: ${req.method}, Succesful process. `);
    res.render('../src/views/pages/order.ejs');
}

const finish = async (req, res) => {
    logger.info(`PATH: ${req.path}, METHOD: ${req.method}, Succesful process. `);
    const cartId = req.body.cartId;
    const cart = await CartDaos.getById(cartId);
    const orderId = await OrderDao.getNewId(cart);
    sendMail(orderId);
    res.render('../src/views/pages/orderFinished.ejs', {
        orderId: orderId
    });
}

module.exports = {
    getOrder,
    finish
};