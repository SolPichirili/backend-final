const PersistenceFactory = require('../daos/index');
const { getPersistence } = require('../utils/getPersistence');

const factory = PersistenceFactory.getInstance();

const UserDao = factory.getPersistenceMethod(getPersistence()).usersDao;

const getUser = async (req, res) => {
    const username = req;
    let user = await UserDao.findUser(username);

    return user;
}

const createUser = async (newUser) => {
    const result = await UserDao.save(newUser);

    return result;
}

module.exports = {
    getUser,
    createUser
}