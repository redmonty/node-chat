import $ from 'jquery';

var socket = io();//init request from server to client
socket.on('connect', function() {
    console.log('Connected to server');// for client msg

});
socket.on('disconnect', function() {
    console.log('Diskonnected from server');
});

socket.on('newMessage', function(date) { //client take from server
    console.log('newMessage', date);
});
socket.emit('createMessage', { //client > server
    from: 'client',
    text: 'hello dear server =)'
}, function(dataCallback) {
    console.log('Got it', dataCallback);
});
var p = $('p');
console.log(p);
