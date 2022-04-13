const logger = require('../../utils/winston');
const PersistenceFactory = require('../../daos/index');
const { getPersistence } = require('../../utils/getPersistence');

const factory = PersistenceFactory.getInstance();
const ChatDao = factory.getPersistenceMethod(getPersistence()).chatDao;

const getMessages = async() =>{
    try{
        const messages = await ChatDao.getAll();
        return messages;
    }catch(error){
        logger.error(`Error (getMessages): ${error}`);
    }
}

const saveMessages = async(newMessage) =>{
    try{
        const message = await ChatDao.save(newMessage);
        return message;
    }catch(error){
        logger.error(`Error (saveMessages): ${error}`);
    }
}

module.exports = {
    getMessages,
    saveMessages
}