const logger = require('../utils/winston');
const PersistenceFactory = require('../daos/index');
const {getPersistence} = require('../utils/getPersistence');

const factory = PersistenceFactory.getInstance();

const ProductDao = factory.getPersistenceMethod(getPersistence()).productsDao;

const getIndex = async (req, res) => {
    const products = await ProductDao.getAll();
    res.render(`../src/views/pages/index.ejs`, {
        email: req.user.email,
        products: products
    })
}

const getById = async (req, res) => {
    logger.info(`PATH: ${req.path}, METHOD: ${req.method}, MESSAGE: Proceso exitoso`);
    const id = req.params.id;
    const productById = await ProductDao.getById(id);
    res.send({ data: productById });
}

const getByCategory = async (req, res) =>{
    logger.info(`PATH: ${req.path}, METHOD: ${req.method}, MESSAGE: Proceso exitoso`);
    const category = req.params.category;
    const productsByCategory = await ProductDao.getById(category);
    res.send({data: productsByCategory});
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