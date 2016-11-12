/**
 * Created by eleven on 23/07/2016.
 */

const redis = require('redis').createClient();

module.exports = function () {

	redis.on("error", function (err) {
		console.log(err);
	});

	redis.set('x', 1);
	redis.get('x', function (error, result) {
		if (error) {
			console.log(error);
		} else {
			console.log(result);
		}
		process.exit();
	});

};