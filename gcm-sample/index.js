/**
 * Created by eleven on 18/07/2016.
 */

const gcm = require('node-gcm');

function run() {

	var message = new gcm.Message({
		data: {key1: 'msg1'}
	});

	// Set up the sender with you API key, prepare your recipients' registration tokens.
	var sender = new gcm.Sender('YOUR_API_KEY_HERE');
	var regTokens = ['YOUR_REG_TOKEN_HERE'];

	sender.send(message, {registrationTokens: regTokens}, function (err, response) {
		if (err) {
			console.error('error: ' + err);
		} else {
			console.log('response:' + response);
		}
	});

	//process.exit();
}

run();