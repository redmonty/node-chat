import $ from 'jquery';
import io from 'socket.io-client'

var socket = io();//init request from server to client
socket.on('connect', function() {
    console.log('Connected to server !!!');// for client msg

});
socket.on('disconnect', function() {
    console.log('Diskonnected from server');
});

socket.on('newMessage', function(date) { //client take from server
    console.log('newMessage', date);
    var li = $('<li></li>');
    li.text(`${date.from}: ${date.text}`);
    $('#messages').append(li);
});
// socket.emit('createMessage', { //client > server
//     from: 'client',
//     text: 'hello dear server =)'
// }, function(dataCallback) {
//     console.log('Got it', dataCallback);
// });

$('#message-form').on('submit', function(e){
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: $('[name=message]').val()
    }, function() {

    });
});
