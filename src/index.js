const options = require('./config');
const logger = require('./utils/winston');
const { Server: SocketServer } = require('socket.io');
const { Server: HttpServer } = require('http');
const server = require('./server');

const { getMessages, saveMessages } = require('./services/chat');

const httpServer = new HttpServer(server);
const io = new SocketServer(httpServer);

let port = options.port;

io.on('connection', async (socket) => {
    logger.info('Nuevo usuario conectado.');

    const messages = await getMessages();
    socket.emit('messages', messages);

    socket.on('new-message', async (message) => {
        await saveMessages(message);
        const messages = await getMessages();

        io.sockets.emit('messages', messages);
    });
});

const app = httpServer.listen(port, () => {
    logger.info(`Servidor corriendo en ${port}`);
});

app.on('error', (error) => {
    logger.error(`Error: ${error}`);
});