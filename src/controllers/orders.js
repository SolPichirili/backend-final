const logger = require('../utils/winston');
const PersistenceFactory = require('../daos/index');
const {getPersistence} = require('../utils/getPersistence');

const factory = PersistenceFactory.getInstance();

const OrderDao = factory.getPersistenceMethod(getPersistence()).ordersDao;

module.exports = {

};