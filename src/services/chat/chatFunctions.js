const PersistenceFactory = require('../../daos/index');
const { getPersistence } = require('../../utils/getPersistence');

const factory = PersistenceFactory.getInstance();

const ChatDao = factory.getPersistenceMethod(getPersistence()).chatDao;

const getMessages = async () => {
    const messages = await ChatDao.getAll();
    return messages;
};

const saveMessages = async (message) => {
    const savedMessages = await ChatDao.save(message);
    return savedMessages;
};

module.exports = {
    getMessages,
    saveMessages
}