const options = require("../config");

const getPersistence = () => options.persistance;

module.exports = {
    getPersistence
}