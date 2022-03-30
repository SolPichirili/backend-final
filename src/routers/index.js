const express = require('express');

const router = express.Router();

const authRouter = require('./auth');
const productsRouter = require('./products');
const cartRouter = require('./cart');
// const multerRouter = require('./multer');
const chatRouter = require('./chat');
const infoRouter = require('./info');

router.use('/', authRouter);
// router.use(multerRouter);
router.use('/productos', productsRouter);
router.use('/carrito', cartRouter);
router.use('/chat', chatRouter);
router.use('/info', infoRouter);

module.exports = router;