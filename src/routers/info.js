const express = require('express');
const infoController = require('../controllers/info');

const infoRouter = express.Router();

infoRouter.get('/', infoController.getInfo);

module.exports = infoRouter;
