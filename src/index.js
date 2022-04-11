const options = require('./config');
const logger = require('./utils/winston');
const httpServer = require('./server');
const cluster = require('cluster');
const numCPUS = require('os').cpus().length;

const isCluster = options.mode === 'CLUSTER';

if (cluster.isMaster && isCluster) {
    logger.info(`Cantidad de procesadores ${numCPUS}`);
    logger.info(`PID MASTER ${process.pid}`);

    for (let i = 0; i < numCPUS; i++) {
        cluster.fork();
    }

    cluster.on('exit', worker => {
        logger.info(`Worker ${worker.process.pid} died ${new Date().toLocaleString()}`);
        cluster.fork();
    })
} else {
    let port = options.port || process.argv[2];

    const app = httpServer.listen(port, () => {
        logger.info(`Cantidad de procesadores ${numCPUS}`);
        logger.info(`PID MASTER ${process.pid}`);
        logger.info(`Funcionando en puerto ${port}`);
    });

    app.on('error', (error) => {
        logger.error(`Error: ${error}`);
    });
}