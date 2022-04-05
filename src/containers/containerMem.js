const logger = require('../utils/winston');

class ContainerMem {
    constructor() {
        this.array = [];
    }

    async save(element) {
        try {
            const list = this.array;

            let elements = [];

            if (list === "") {
                element._id = String(1);
                element.timestamp = Date.now();
                elements.push(element);
            } else {
                element._id = String(list.length + 1);
                element.timestamp = Date.now();
                list.push(element);
                elements = list;
            }
            return elements;

        } catch (error) {
            logger.error(`Error de container (save): ${error}`);
        }
    }

    async findUser(email) {
        try {
            const list = this.array;
            const elementList = list.find(e => e.email === email);

            if (!elementList) {
                return { error: 'No encontrado' };
            }
            return elementList;
        }
        catch (error) {
            logger.error(`Error de container (findUser): ${error}`);
        }
    }

    async getAll() {
        try {
            const list = this.array;
            return list;

        } catch (error) {
            logger.error(`Error de container (getAll): ${error}`);
        }
    }

    async getById(id) {
        try {
            const list = this.array;
            const elementList = list.find(e => e._id === id);

            if (!elementList) {
                return { error: 'No encontrado' };
            }
            return elementList;

        } catch (error) {
            logger.error(`Error de container (getById): ${error}`);
        }
    }

    async getByCategory(category) {
        try {
            const list = this.array;
            const elementList = list.find(e => e.category === category);

            return elementList;
        }
        catch (error) {
            logger.error(`Error de container (getByCategory): ${error}`);
        }
    }

    async getByEmail(email) {
        try {
            const list = this.array;
            const elementList = list.find(e => e.email === email);

            return elementList;
        }
        catch (error) {
            logger.error(`Error de container (getByCategory): ${error}`);
        }
    }

    async getNewId(element) {
        try {
            const list = this.array;

            let elements = [];

            if (list === "") {
                element._id = String(1);
                element.timestamp = Date.now();
                elements.push(element);
            } else {
                element._id = String(list.length + 1);
                element.timestamp = Date.now();
                list.push(element);
                elements = list;
            }
            return element._id;

        } catch (error) {
            console.error('Error: ', error);
        }
    }

    async update(id, elemento) {
        try {
            const list = this.array;
            const element = list.find(e => e._id === id);
            const indexOfElement = list.findIndex(e => e._id === id);

            if (!element) {
                return { error: 'No encontrado' };
            };

            const updatedList = {
                ...element,
                ...elemento
            }

            list[indexOfElement] = updatedList;
            return updatedList;

        } catch (error) {
            logger.error(`Error de container (update): ${error}`);
        }
    }

    async addProductById(cartId, products) {
        try {
            const list = this.array;
            const element = list.find(e => e._id === cartId);

            if (!element) {
                return ({ error: 'El carrito no existe' });
            };

            if (!element.productos) {
                element.productos = [];
            };

            element.productos.push(products);
            return element;
        }
        catch (error) {
            logger.error(`Error de contenedor (addProductById): ${error}`);
        }
    }

    async deleteById(id) {
        try {
            const list = this.array;
            const element = list.find(e => e._id === id);
            const indexOfElement = list.findIndex(e => e._id === id);

            if (!element) {
                return { error: 'No encontrado' };
            };

            list.splice(indexOfElement, 1);
            return list;

        } catch (error) {
            logger.error(`Error de contenedor (deleteById): ${error}`);
        }
    }

    async deleteProductById(cartId, productId) {
        try {
            const list = this.array;
            const cart = list.find(c => c._id === cartId);
            const { productos } = cart;
            const indexOfElement = productos.findIndex(p => p._id === productId);

            productos.splice(indexOfElement, 1);
            return list;

        } catch (error) {
            logger.error(`Error de contenedor (deleteProductById): ${error}`);
        }
    }
}

module.exports = ContainerMem;