const express = require('express');
const productsController = require('../controllers/products');
const { isAdmin } = require('../middlewares/admin');

const productsRouter = express.Router();

productsRouter.get('/', productsController.getIndex);

productsRouter.get('/:id', productsController.getById);

productsRouter.get('/categorias/:category', productsController.getByCategory);

productsRouter.post('/', isAdmin, productsController.save);

productsRouter.put('/:id', isAdmin, productsController.update);

productsRouter.delete('/:id', isAdmin, productsController.deleteById);

module.exports = productsRouter;