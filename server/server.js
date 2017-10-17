const log = a => console.log(a);
const path = require('path'),
    http = require('http'),
    express = require('express'),
    socketIO = require('socket.io');

const app = express(),
    publicPath = path.join(__dirname, '../public'),
    port = process.env.PORT || 3000;

const server = http.createServer(app);//for socket
const io = socketIO(server);

app.use(express.static(publicPath));//config express static midlewere

app.get('/', (req,res) => {
    res.send(index);
});


io.on('connection', (socket) => {//подписуемся на событие подключения когото
    log('New user connected');//сообщение серверу
    socket.on('disconnect', (socket) => {
        log('User disconnect');
    });
});

server.listen(port, () => {log(`Server start on port: ${port}`);});