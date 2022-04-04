const express = require('express');

const router = express.Router();

const authRouter = require('./auth');
const productsRouter = require('./products');
const cartRouter = require('./cart');
const chatRouter = require('./chat');
const infoRouter = require('./info');
const orderRouter = require('./order');

router.use('/', authRouter);
router.use('/productos', productsRouter);
router.use('/carrito', cartRouter);
router.use('/chat', chatRouter);
router.use('/info', infoRouter);
router.use('/order', orderRouter);

module.exports = router;