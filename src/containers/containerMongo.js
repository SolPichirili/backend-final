const mongoose = require('mongoose');
const options = require('../config');
const logger = require('../utils/winston');

class ContainerMongo {
    constructor(model) {
        this.model= model;
        this.init();
    }

    async init() {
        if (!this.connection) {
            this.connection = await mongoose.connect(options.mongodb.url, options.mongodb.options);
        }
    }

    async save(element) {
        try {
            const document = await this.model.create(element);
            return document;

        } catch (error) {
            logger.error(`Error de container (save): ${error}`);
        }
    }

    async findUser(email){
        try{
            const documents = await this.model.findOne({email});

            if (documents.length === 0){
                return false
            }

            return documents;
        }
        catch(error){
            logger.error(`Error de container (findUser): ${error}`);
        }
    }

    async getAll() {
        try {
            const documents = await this.model.find({});
            return documents;

        } catch (error) {
            logger.error(`Error de container (getAll): ${error}`);
        }
    }

    async getById(id) {
        try {
            const documents = await this.model.find({ _id: id })

            if (documents.length === 0) {
                return { error: 'No encontrado' };
            }
            return documents[0];

        } catch (error) {
            logger.error(`Error de container (getById): ${error}`);
        }
    }

    async getByCategory(category){
        try{
            const documents = await this.model.find({category});
            return documents;
        }
        catch(error){
            logger.error(`Error de container (getByCategory): ${error}`);
        }
    }

    async getNewId(element) {
        try {
            const document = await this.model.create(element);
            return document._id;

        } catch (error) {
            console.error('Error: ', error);
        }
    }

    async update(id, element) {
        try {
            const { n, nModified } = await this.model.updateOne({ _id: id }, { $set: element })

            if (n == 0 || nModified == 0) {
                return { error: 'No encontrado' };
            };

            const updatedElement = await this.getById(id);
            return updatedElement;

        } catch (error) {
            logger.error(`Error de container (update): ${error}`);
        }
    }

    async addProductById(cartId, products) {
        try{
            const document = await this.getById(cartId);

            if (!document){
                return {error: 'El carrito no existe.'}
            }
    
            let elements = document.productos;
    
            products.map(e=> elements.push(e))
    
            await this.update(cartId, {productos: elements});
    
            return elements;
        }
        catch(error){
            logger.error(`Error de container (addProductById): ${error}`);
        }

    }

    async deleteById(id) {
        try {
            const document = await this.model.deleteOne({ _id: id })
            if (!document) {
                return { error: 'No encontrado' };
            };

            return document;

        } catch (error) {
            logger.error(`Error de container (deleteById): ${error}`);
        }
    }

    async deleteProductById(cartId, productId) {
        try {
            const document = await this.getById(cartId);

            if (!document) {
                return ({error: 'El carrito no existe'});
            };

            const elements = document.productos;
            const element = elements.findIndex(e => e.id === productId);
            elements.splice(element, 1);

            await this.update(cartId, {productos: elements});

            return document;

        } catch (error) {
            logger.error(`Error de container (deleteProductById): ${error}`);
        }
    }
}

module.exports = ContainerMongo;
