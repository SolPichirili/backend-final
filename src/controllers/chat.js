const logger = require('../utils/winston');
const PersistenceFactory = require('../daos/index');
const {getPersistence} = require('../utils/getPersistence');

const factory = PersistenceFactory.getInstance();

const ChatDao = factory.getPersistenceMethod(getPersistence()).chatDao;

const getAll = async (req, res) =>{
    logger.info(`PATH: ${req.path}, METHOD: ${req.method}, MESSAGE: Proceso exitoso`);
    const messageList = await ChatDao.getAll();
    res.send({ data: messageList });
}

const showChat = (req, res) =>{
    logger.info(`PATH: ${req.path}, METHOD: ${req.method}, MESSAGE: Proceso exitoso`);
    res.render('../src/views/pages/chat.ejs');
}

const getByEmail = async (req, res) => {
    logger.info(`PATH: ${req.path}, METHOD: ${req.method}, MESSAGE: Proceso exitoso`);
    const mail = req.params.mail;
    const messagesByMail = await ChatDao.getById(mail);
    res.send({data: messagesByMail})
}

const save = async (req, res) =>{
    logger.info(`PATH: ${req.path}, METHOD: ${req.method}, MESSAGE: Proceso exitoso`);
    const newMessage = req.body;
    const newList = await ChatDao.save(newMessage);
    res.send({ data: newList });
}

module.exports = {
    showChat,
    getAll,
    getByEmail,
    save
}