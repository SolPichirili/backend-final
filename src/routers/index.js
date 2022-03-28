const express = require('express');

const router = express.Router();

const authRouter = require('./auth');
const productsRouter = require('./products');
const cartRouter = require('./cart');
const multerRouter = require('./multer');
const chatRouter = require('./chat');

router.use(authRouter);
router.use(multerRouter);
router.use('/productos', productsRouter);
router.use('/carrito', cartRouter);
router.use('/chat', chatRouter);

module.exports = router;