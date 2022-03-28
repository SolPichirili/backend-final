const express = require('express');
const chatController = require('../controllers/chat');

const chatRouter = express.Router();

chatRouter.get('/', chatController.showChat);

chatRouter.get('/:email', chatController.getByEmail);

module.exports = chatRouter;