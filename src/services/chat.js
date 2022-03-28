const chatController = require('../controllers/chat');

const getMessages = async () => {
    const messages = await chatController.getAll();
    return messages;
};

const saveMessages = async (message) => {
    const savedMessages = await chatController.save(message);
    return savedMessages;
};

module.exports = {
    getMessages,
    saveMessages
}