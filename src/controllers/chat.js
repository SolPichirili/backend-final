const logger = require('../utils/winston');
const PersistenceFactory = require('../daos/index');
const { getPersistence } = require('../utils/getPersistence');

const factory = PersistenceFactory.getInstance();

const ChatDao = factory.getPersistenceMethod(getPersistence()).chatDao;

const showChat = (req, res) => {
    logger.info(`PATH: ${req.path}, METHOD: ${req.method}, MESSAGE: Proceso exitoso`);
    res.render('../src/views/pages/chat.ejs');
}

const getByEmail = async (req, res) => {
    logger.info(`PATH: ${req.path}, METHOD: ${req.method}, MESSAGE: Proceso exitoso`);
    const mail = req.params.email;
    const messagesByMail = await ChatDao.getByEmail(mail);
    res.render('../src/views/pages/messages.ejs', {
        messages: messagesByMail
    })
}

const save = async (req, res) => {
    logger.info(`PATH: ${req.path}, METHOD: ${req.method}, MESSAGE: Proceso exitoso`);
    const newMessage = req.body;
    await ChatDao.save(newMessage);
}

module.exports = {
    showChat,
    getByEmail,
    save
}