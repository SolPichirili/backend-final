const logger = require('../utils/winston');

const getInfo = (req, res) =>{
    logger.info(`PATH: ${req.path}, METHOD: ${req.method}, PROCESO EXITOSO`);
    const info = {
        ArgsDeEntrada: process.argv,
        NombreDeLaPlataforma: process.platform,
        VersionDeNode: process.version,
        MemoriaTotalReservada: process.memoryUsage(),
        PathDeEjecucion: process.execPath,
        ProcessId: process.pid,
        CarpetaDelProyecto: process.cwd()
    };
    res.render('../src/views/pages/info.ejs', {
        info: info
    });
}


module.exports = {
    getInfo
}