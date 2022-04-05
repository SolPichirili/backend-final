const options = require('./config');
const logger = require('./utils/winston');
const httpServer = require('./server');

let port = options.port;

const app = httpServer.listen(port, () => {
    logger.info(`Servidor corriendo en ${port}`);
});

app.on('error', (error) => {
    logger.error(`Error: ${error}`);
});