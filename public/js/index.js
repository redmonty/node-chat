

var socket = io();//init request from server to client
socket.on('connect', function() {
    console.log('Connected to server');// for client msg

    socket.emit('createMessage', { //client > server
        from: 'client',
        text: 'hello dear server =)'
    });
});
socket.on('disconnect', function() {
    console.log('Diskonnected from server');
});

socket.on('newMessage', function(date) { //client from server
    console.log('newMessage', date);
});

