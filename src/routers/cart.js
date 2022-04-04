const express = require('express');
const cartController = require('../controllers/cart');

const cartRouter = express.Router();

cartRouter.get('/', cartController.createCart);

cartRouter.get('/:id', cartController.getById);

cartRouter.post('/', cartController.addProductById);

cartRouter.delete('/:id', cartController.deleteById);

cartRouter.delete('/:id', cartController.deleteProductById);


module.exports = cartRouter;