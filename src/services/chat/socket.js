const logger = require('../../utils/winston');
const { getMessages, saveMessages } = require('../chat/chatFunctions');

const socketChat = async (io, socket) => {
    logger.info('Nuevo usuario conectado en Socket.');

    const messages = await getMessages();
    socket.emit('messages', messages);

    socket.on('new-message', async (message) => {
        await saveMessages(message);
        const messages = await getMessages();

        io.sockets.emit('messages', messages);
    }
    )
}

module.exports = {
    socketChat
};