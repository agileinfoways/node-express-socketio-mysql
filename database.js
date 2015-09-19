var mysql = require('mysql');

var pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'test',
	connectionLimit: 500,
	supportBigNumbers: true,
	multipleStatements: true
});

// Super re-usable function for performing query
exports.exec = function (sql, data, callback) {
	// get a connection from the pool
	pool.getConnection(function(err, connection) {
		if (err) {
			console.log(err);
			callback(true);
			return;
		}
		
		// make the query
		connection.query(sql, data, function(err, results) {
			connection.release();
			if (err) {
				console.log(err);
				callback(true);
				return;
			}
			callback(false, results);
		});
	});
};