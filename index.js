var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var db = require('./database.js');

var users = 0, params;

app.use('/', express.static(__dirname + '/public'));

io.on('connection', function(socket) {
	users++;

	// Broadcast every time user connects
	io.emit('user connect', users);
	
	// Do following when user is disconnected
	socket.on('disconnect', function() {
		users--;
		io.emit('user connect', users);
	});

	socket.on('trigger query', function (object) {
		params = object.params ? object.params : [];
		db.exec(object.query, params, function(err, results) {
			if (err) { // If unexpected error then send 500
				io.emit('query error', err);
			} else {
				io.emit('query result', {data:results});
			}
		});
	});

});

http.listen(3000, function() {
	console.log('listening on *:3000');
});
