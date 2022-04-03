const logger = require('../utils/winston');
const PersistenceFactory = require('../daos/index');
const {getPersistence} = require('../utils/getPersistence');

const factory = PersistenceFactory.getInstance();

const ProductDao = factory.getPersistenceMethod(getPersistence()).productsDao;

const getIndex = async (req, res) => {
    const products = await ProductDao.getAll();
    res.render(`../src/views/pages/index.ejs`, {
        products: products
    })
}

const getById = async (req, res) => {
    logger.info(`PATH: ${req.path}, METHOD: ${req.method}, MESSAGE: Proceso exitoso`);
    const id = req.params.id;
    const productById = await ProductDao.getById(id);

    if(!productById){
        res.render(`../src/views/pages/productError.ejs`);
    }

    res.render(`../src/views/pages/productId.ejs`, {
        product: productById
    });
}

const getByCategory = async (req, res) =>{
    logger.info(`PATH: ${req.path}, METHOD: ${req.method}, MESSAGE: Proceso exitoso`);
    const category = req.params.category;
    const productsByCategory = await ProductDao.getByCategory(category);

    if(!productsByCategory){
        res.render(`../src/views/pages/productError.ejs`);
    }

    res.render(`../src/views/pages/index.ejs`, {
        products: productsByCategory
    });
}

const save = async (req, res) => {
    logger.info(`PATH: ${req.path}, METHOD: ${req.method}, MESSAGE: Proceso exitoso`);
    const newProduct = req.body;
    const newList = await ProductDao.save(newProduct);
    res.send({ data: newList });
}

const update = async (req, res) => {
    logger.info(`PATH: ${req.path}, METHOD: ${req.method}, MESSAGE: Proceso exitoso`);
    const id = req.params.id;
    const newProduct = req.body;
    const updatedProduct = await ProductDao.update(id, newProduct);
    res.send({ data: updatedProduct });
}

const deleteById = async (req, res) => {
    logger.info(`PATH: ${req.path}, METHOD: ${req.method}, MESSAGE: Proceso exitoso`);
    const id = req.params.id;
    const newList = await ProductDao.deleteById(id);
    res.send({ data: newList });
}

module.exports = {
    getIndex,
    getById,
    getByCategory,
    save,
    update,
    deleteById
}