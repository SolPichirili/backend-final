const logger = require('../../utils/winston');

const {getMessages, saveMessages} = require('./chatFunctions');

const socketIo = async (io, socket) =>{
    logger.info('Usuario conectado.');

    socket.emit('messages', await getMessages());

    socket.on('message', async(newMessage)=>{
        const message = await saveMessages(newMessage);
        io.sockets.emit('message', message);
    })
}

module.exports = {
    socketIo
}