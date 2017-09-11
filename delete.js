var mysql = require('mysql');
var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "King05101997",
	database: "mining_data"
});
con.connect(function(err) {
	if (err) throw err;
	console.log("Connected!");
});

var sql = "TRUNCATE mining_data_per_day;";
			con.query(sql, function(err, result) {
				if (err) throw err;
				console.log("Deleted:" + result);
			});