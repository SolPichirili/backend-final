const express = require('express');
const http = require('http');
const cors = require('cors');
const compression = require('compression');
const passport = require('./services/auth/auth');
const {Server} = require('socket.io');
const {socketIo} = require('./services/chat/socketIo');
const router = require('./routers/index');

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

io.on('connection', (socket)=>{
    socketIo(io, socket);
});

server.use(router);

module.exports = httpServer;
