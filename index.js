var axios = require('axios');
var math = require('mathjs');
var mysql = require('mysql');
const express = require('express');
const app = express()
app.set('view engine', 'pug')
var reward;
var reward_usd;
var hashrate = 1000;
var block_reward = 12.5;
var current_difficulty;
var network_hashrate;
var block_time;
var counter1 = 0;
// USD = 50
// Sol/s = 25
output = {price: 5}
app.get("/", (req, res) => {
  res.render("index", output);
  return;
});
var listener = app.listen(8000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "King05101997",
	database: "mining_data"
});
con.connect(function(err) {
	if (err) throw err;
	console.log("Connected!");
	repeat();
});
setInterval(repeat, 1000 * 30);
// This is to capture realtime data using api
function repeat() {
	axios.get('https://api.zcha.in/v2/mainnet/network').then(function(response) {
		axios.get('https://api.coinmarketcap.com/v1/ticker/zcash/').then(function(res) {
			current_difficulty = response.data.difficulty;
			reward = (hashrate / (current_difficulty * 8192)) * 10 * 60 * 30;
			reward_usd = math.round(reward * res.data[0].price_usd, 2);
			console.log("------------------------- Formula 1 -------------------------");
			// console.log("Estimated reward in ZEC:" + reward);
			// console.log("Estimated reward in USD:" + reward_usd);
			counter1 = counter1 + 1;
			var sql = "INSERT INTO mining_data_per_day VALUES (" + counter1 + "," + reward + "," + "NOW());";
			con.query(sql, function(err, result) {
				if (err) throw err;
				console.log("Number of records inserted: " + result.affectedRows);
				con.query("select avg(MinedQty) from mining_data_per_day", function(err, result, field) {
					if (err) throw err;
					// console.log(result);
					console.log("Total Mined ZEC:" + result[0]["avg(MinedQty)"]);
				});
			});
		}).catch(function(error) {
			console.log(error);
		});
	}).catch(function(error) {
		console.log(error);
	});
};
// console.log("------------------------- Formula 2 -------------------------");
// network_hashrate = response.data.hashrate;
// block_time = response.data.meanBlockTime;
// reward = (hashrate/network_hashrate)*(86400/block_time*block_reward)* reward_usd;
// reward_usd = reward * res.data[0].price_usd;
// console.log("Estimated reward in ZEC:" + reward);
// console.log("Estimated reward in USD:" + reward_usd);
// This is the formula to calculate the reward of mining.
// ( hashRate / ( difficulty * 8192 ) ) * 10 * 3600 * 24