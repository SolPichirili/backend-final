const fs = require('fs');
const logger = require('../utils/winston');

class ContainerFs {
    constructor(file) {
        this.file = file;
    }

    async save(element) {
        try {
            const content = await fs.promises.readFile(`${this.file}`, 'utf-8');

            let elements = [];

            if (content === "") {
                element._id = String(1);
                element.timestamp = Date.now();
                elements.push(element);
            } else {
                const list = JSON.parse(content);

                element._id = String(list.length + 1);
                element.timestamp = Date.now();
                list.push(element);
                elements = list;
            }
            const listString = JSON.stringify(elements, null, 2);
            await fs.promises.writeFile(`${this.file}`, listString);
            return elements;
        } catch (error) {
            logger.error(`Error de container (save): ${error}`);
        }
    }

    async findUser(email) {
        try {
            const content = await fs.promises.readFile(`${this.file}`, 'utf-8');
            const list = JSON.parse(content);
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
            const content = await fs.promises.readFile(`${this.file}`, 'utf-8');
            const list = JSON.parse(content);
            return list;
        } catch (error) {
            logger.error(`Error de container (getAll): ${error}`);
        }
    }

    async getById(id) {
        try {
            const content = await fs.promises.readFile(`${this.file}`, 'utf-8');
            const list = JSON.parse(content);
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
            const content = await fs.promises.readFile(`${this.file}`, 'utf-8');
            const list = JSON.parse(content);
            const elementList = list.filter(e => e.category === category);

            return elementList;
        }
        catch (error) {
            logger.error(`Error de container (getByCategory): ${error}`);
        }
    }

    async getByEmail(email) {
        try {
            const content = await fs.promises.readFile(`${this.file}`, 'utf-8');
            const list = JSON.parse(content);
            const elementList = list.filter(e => e.email === email);

            return elementList;
        }
        catch (error) {
            logger.error(`Error de container (getByCategory): ${error}`);
        }
    }

    async getNewId(element) {
        try {
            const content = await fs.promises.readFile(`${this.file}`, 'utf-8')

            let elements = [];

            if (content === "") {
                element._id = String(1);
                element.timestamp = Date.now();
                elements.push(element);
            } else {
                const list = JSON.parse(content);

                element._id = String(list.length + 1);
                element.timestamp = Date.now();
                list.push(element);
                elements = list;
            }
            const listString = JSON.stringify(elements, null, 2);
            await fs.promises.writeFile(`${this.file}`, listString);
            return element._id;

        } catch (error) {
            console.error('Error: ', error);
        }
    }

    async update(id, elemento) {
        try {
            const content = await fs.promises.readFile(`${this.file}`, 'utf-8');
            const list = JSON.parse(content);
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

            const listString = JSON.stringify(list, null, 2);
            await fs.promises.writeFile(`${this.file}`, listString);

            return updatedList;
        } catch (error) {
            logger.error(`Error de container (update): ${error}`);
        }
    }

    async addProductById(cartId, product) {
        try {
            const cart = await this.getById(cartId);

            if (!cart.products) {
                cart.products = [];
            }

            const productsList = cart.products;
            const isInCart = productsList.find(p => p._id === product._id);

            if (isInCart) {
                isInCart.quantity++;
            } else {
                product.quantity = 1;
                productsList.push(product);
            }

            return productsList;
        } catch (error) {
            logger.error(`Error de container (addProductById): ${error}`);
        }
    }

    async deleteById(id) {
        try {
            const content = await fs.promises.readFile(`${this.file}`, 'utf-8');
            const list = JSON.parse(content);
            const element = list.find(e => e._id === id);
            const indexOfElement = list.findIndex(e => e._id === id);

            if (!element) {
                return { error: 'No encontrado' };
            };

            list.splice(indexOfElement, 1);
            const listString = JSON.stringify(list, null, 2);

            await fs.promises.writeFile(`${this.file}`, listString);
            return list;

        } catch (error) {
            logger.error(`Error de container (deleteById): ${error}`);
        }
    }

    async deleteProductById(cartId, productId) {
        try {
            const content = await fs.promises.readFile(`${this.file}`, 'utf-8');
            const list = JSON.parse(content);
            const cart = list.find(c => c._id === cartId);
            const { productos } = cart;
            const indexOfElement = productos.findIndex(p => p._id === productId);

            productos.splice(indexOfElement, 1);

            const listString = JSON.stringify(list, null, 2);
            await fs.promises.writeFile(`${this.file}`, listString);

            return list;
        } catch (error) {
            logger.error(`Error de container (deleteProductById): ${error}`);
        }
    }
}

module.exports = ContainerFs;