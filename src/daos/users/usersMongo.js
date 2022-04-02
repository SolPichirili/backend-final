const ContainerMongo = require("../../containers/ContainerMongo");
const UserMongo = require('../../models/UserMongo');

class UsersMongoDaos extends ContainerMongo {
    constructor() {
        super(UserMongo);
    }
}

module.exports = UsersMongoDaos;