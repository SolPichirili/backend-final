const express = require('express');
const orderController = require('../controllers/order');

const orderRouter = express.Router();

orderRouter.get('/', orderController.getOrder);

orderRouter.post('/', orderController.finish);

module.exports = orderRouter;