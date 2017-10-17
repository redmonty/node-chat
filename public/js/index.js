var socket = io();//init request from server to client
socket.on('connect', function() {
    console.log('Connected to server');// for client msg
});
socket.on('disconnect', function() {
    console.log('Diskonnected from server');
});