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
    

    socket.on('createMessage', (msg) => { //server take msg from client
        log(msg);
        io.emit('newMessage', { //and turn data to client
            from: msg.from,
            text: msg.text,
            createdAt: new Date().toLocaleTimeString()
        });
        // socket.broadcast.emit('newMessage', {
        //     from: msg.from,
        //         text: msg.text,
        //         createdAt: new Date().toLocaleTimeString()
        // });
        socket.emit('newMessage', {
            from: 'Admin',
            text: 'Welcome to the chat app',
            createdAt: new Date().toLocaleTimeString()
        });
        socket.broadcast.emit('newMessage', {
            from: 'Admin',
            text: 'new user joined',
            createdAt: new Date().toLocaleTimeString()
        })
    }); 
});

server.listen(port, () => {log(`Server start on port: ${port}`);});