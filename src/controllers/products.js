const logger = require('../utils/winston');
const PersistenceFactory = require('../daos/index');
const { getPersistence } = require('../utils/getPersistence');

const factory = PersistenceFactory.getInstance();

const ProductDao = factory.getPersistenceMethod(getPersistence()).productsDao;

const getIndex = async (req, res) => {
    const products = await ProductDao.getAll();
    res.render('../src/views/pages/index.ejs', {
        products: products
    });
}

const getById = async (req, res) => {
    logger.info(`PATH: ${req.path}, METHOD: ${req.method}, MESSAGE: Proceso exitoso`);
    const id = req.params.id;
    const productById = await ProductDao.getById(id);

    if (!productById) {
        res.send(`El producto con ID ${id} no existe.`);
    }

    res.render('../src/views/pages/productId.ejs', {
        product: productById
    });
}

const getByCategory = async (req, res) => {
    logger.info(`PATH: ${req.path}, METHOD: ${req.method}, MESSAGE: Proceso exitoso`);
    const category = req.params.category;
    const productsByCategory = await ProductDao.getByCategory(category);

    if (!productsByCategory) {
        res.send(`No existe productos en la categoria ${category}.`);
    }

    res.render('../src/views/pages/index.ejs',{ 
        productos: productsByCategory 
    });
}

const save = async (req, res) => {
    logger.info(`PATH: ${req.path}, METHOD: ${req.method}, MESSAGE: Proceso exitoso`);
    const newProduct = req.body;
    const newList = await ProductDao.save(newProduct);
    res.send(`Lista de productos: ${newList}`);
}

const update = async (req, res) => {
    logger.info(`PATH: ${req.path}, METHOD: ${req.method}, MESSAGE: Proceso exitoso`);
    const id = req.params.id;
    const newProduct = req.body;
    const updatedProduct = await ProductDao.update(id, newProduct);
    res.json({ product: updatedProduct });
}

const deleteById = async (req, res) => {
    logger.info(`PATH: ${req.path}, METHOD: ${req.method}, MESSAGE: Proceso exitoso`);
    const id = req.params.id;
    const newList = await ProductDao.deleteById(id);
    res.send(`Lista de productos: ${newList}`);
}

module.exports = {
    getIndex,
    getById,
    getByCategory,
    save,
    update,
    deleteById
}