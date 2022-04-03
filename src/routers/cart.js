const express = require('express');
const cartController = require('../controllers/cart');

const cartRouter = express.Router();

cartRouter.get('/', cartController.getCart);

cartRouter.get('/:id', cartController.getById);

cartRouter.post('/', cartController.getCart);

cartRouter.post('/:id/productos', cartController.addProductById);

cartRouter.delete('/:id', cartController.deleteById);

cartRouter.delete('/:id/productos/:id_prod', cartController.deleteProductById);


module.exports = cartRouter;