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
    if(date.text.toLowerCase() === 'fack you') date.text = 'i love you';
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
    var msgInput = $('[name=message]');
    socket.emit('createMessage', {
        from: 'User',
        text: msgInput.val()
    }, function() {
        msgInput.val('');
    });
});
var locationButton = $('#send-location');
locationButton.on('click', function() {
    if(!navigator.geolocation) {
        return alert('Geolocation not supported in your browser');
    }
    locationButton.attr('disabled', 'disabled').text('Sending...');
    navigator.geolocation.getCurrentPosition((position) => { //take position
        locationButton.removeAttr('disabled').text('Send location');
        // console.log(position);
        socket.emit('createLocationMessage', { //give it to server
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
        
    },(err) => {
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location');
    });
});
socket.on('newLocationMessage', (data) => {
    var li = $('<li></li>');
    var a = $('<a target="_blank">My current loction</a>');
    li.text(`${data.from}: `)
    a.attr('href', data.url);
    li.append(a);
    $('#messages').append(li);
});
