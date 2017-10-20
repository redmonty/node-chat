import $ from 'jquery';
import io from 'socket.io-client';
import moment from 'moment';

var socket = io();//init request from server to client
socket.on('connect', function() {
    console.log('Connected to server !!!');// for client msg

});
socket.on('disconnect', function() {
    console.log('Diskonnected from server');
});

socket.on('newMessage', function(date) { //client take from server
    var li = $('<li></li>');
    var formatedTime = moment(date.createdAt).format('LT');
    console.log('newMessage', date);
    if(date.text.toLowerCase() === 'fack you') date.text = 'i love you';
    if(date.text.length === 0) return false;
    li.text(`${date.from} ${formatedTime}: ${date.text}`);
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
    var li = $('<li></li>'),
        a = $('<a target="_blank">My current location</a>'),
        formatedTime = moment(data.createdAt).format('LT');
    li.text(`${data.from} ${formatedTime}: `)
    a.attr('href', data.url);
    li.append(a);
    $('#messages').append(li);
});

var date = new moment();
console.log(date.format('LT'));
console.log(date.format());
