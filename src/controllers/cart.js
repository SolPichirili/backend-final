const PersistenceFactory = require('../daos/index');
const { getPersistence } = require('../utils/getPersistence');
const logger = require('../utils/winston');

const factory = PersistenceFactory.getInstance();

const CartDaos = factory.getPersistenceMethod(getPersistence()).cartDao;
const ProductDaos = factory.getPersistenceMethod(getPersistence()).productsDao;

const createCart = async (req, res) => {
    const cart = req.body;
    const cartId = await CartDaos.getNewId(cart);

    res.render('../src/views/pages/cart.ejs', {
        cartId: cartId
    });
}

const addProductById = async (req, res) => {
    logger.info(`PATH: ${req.path}, METHOD: ${req.method}, MESSAGE: Proceso exitoso`);
    const cartId = req.body.cartId;
    const productId = req.body.prodId;
    const product = await ProductDaos.getById(productId);

    if (!product){
        res.send(`The product ${productId} has not been found.`);
    }

    const cart = await CartDaos.addProductById(cartId, product);
    const {products} = cart;
    
    res.render('../src/views/pages/cartShow.ejs', {
        cartId: cartId,
        cart: products
    });
}

const getById = async (req, res) => {
    const id = req.params.id;
    const cart = await CartDaos.getById(id);

    if (!cart) {
        res.send(`El carrito con ID ${id} no existe`);
    }

    res.send(`El carrito con ID ${id} esxiste.`);
}

const deleteById = async (req, res) => {
    logger.info(`PATH: ${req.path}, METHOD: ${req.method}, MESSAGE: Proceso exitoso`);
    const id = req.params.id;
    const cartDeletedId = await CartDaos.deleteById(id);
    res.send({ data: cartDeletedId });
}



const deleteProductById = async (req, res) => {
    logger.info(`PATH: ${req.path}, METHOD: ${req.method}, MESSAGE: Proceso exitoso`);
    const cartId = req.params.id;
    const productId = req.params.id_prod;
    const cart = await CartDaos.deleteProductById(cartId, productId);
    res.send({ data: cart });
}

module.exports = {
    createCart,
    deleteById,
    getById,
    addProductById,
    deleteProductById
}