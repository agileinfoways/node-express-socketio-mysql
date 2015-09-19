# node-express-socketio-mysql

No more API calls. Communitcate with database with socket.io

## List of events available:

#### `user connect`
Broadcasted when a new user is connected to socket

You can get number of users connected as follows:

```javascript
socket.on('user connect', function (users) {
	// `users` contains number of users connected
});
```
#### `trigger query`
Perform query with parameters. Parameters are optional.

**Example of only query:**
```javascript
socket.emit('trigger query', {
	query: 'SELECT * FROM users'
});
```

**Example of multiple queries:**
```javascript
socket.emit('trigger query', {
	query: 'SELECT * FROM users; SELECT * FROM user_settings; SELECT * FROM user_phones;'
});
```

**Example of query with parameters:**
```javascript
socket.emit('trigger query', {
	query: 'SELECT * FROM users WHERE username=? AND password=?',
	params: ['jayshah', '000100010']
});

**Example of batch insert:**
```javascript
var values = [
    ['demian', 'demian@gmail.com'],
    ['john', 'john@gmail.com'],
    ['mark', 'mark@gmail.com'],
    ['pete', 'pete@gmail.com']
];

socket.emit('trigger query', {
	query: 'INSERT INTO Test (name, email) VALUES ?',
	params: [values]
});
```

Well, thats pretty much it! 
