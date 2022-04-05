const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const compression = require('compression');
const sessionMongo = require('./services/session');
const passport = require('./services/auth/auth');
const cors = require('cors');
const router = require('./routers/index');
const { socketChat } = require('./services/chat/socket');

const server = express();

const httpServer = http.createServer(server);

const io = new Server(httpServer);

server.use(cors());
server.use(compression());

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use(express.static(__dirname + '/public'));

server.set('view engine', 'ejs');

server.use(passport.initialize());
server.use(sessionMongo);

io.on('connection', async (socket) => {
    socketChat(io, socket);
});

server.use(router);

module.exports = httpServer;
