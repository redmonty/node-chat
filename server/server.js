const log = a => console.log(a);
const path = require('path'),
    http = require('http'),
    express = require('express'),
    socketIO = require('socket.io'),
    {generateMessage} = require('./utils/message');

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
    
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat'));
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'new user joined'));

    socket.on('createMessage', (msg, callback) => { //server take msg from client
        log(msg);
        io.emit('newMessage', generateMessage(msg.from,msg.text));
        callback('This is from the server');
        // socket.broadcast.emit('newMessage', {
        //     from: msg.from,
        //         text: msg.text,
        //         createdAt: new Date().toLocaleTimeString()
        // });
    }); 
});

server.listen(port, () => {log(`Server start on port: ${port}`);});