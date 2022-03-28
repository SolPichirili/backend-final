const express = require('express');
const {authMiddleware} = require('../middlewares/auth');
const productsController = require('../controllers/products');
const { isAdmin } = require('../middlewares/admin');

const productsRouter = express.Router();

productsRouter.get('/', authMiddleware, productsController.getIndex);

productsRouter.get('/:id', productsController.getById);

productsRouter.post('/', isAdmin, productsController.save);

productsRouter.put('/:id', isAdmin, productsController.update);

productsRouter.delete('/:id', isAdmin, productsController.deleteById);

module.exports = productsRouter;