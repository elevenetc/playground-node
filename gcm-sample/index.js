/**
 * Created by eleven on 18/07/2016.
 */

const gcm = require('node-gcm');

function run() {

	var message = new gcm.Message({
		data: {key1: 'msg1'}
	});

	// Set up the sender with you API key, prepare your recipients' registration tokens.
	var sender = new gcm.Sender('743596259723');
	var regTokens = ['dAW5eBptUpk:APA91bF337tn_U0VsSZ1EcCbe7lOIaFynAu8Mx6mFxthURX4EHSovDUbU9AUKFQ-_lkkxMd8eO1xiC2tx0B-lG3mtpKhJh5yqpEI5-hOmOZtzk9yLEYUTuUdNRGWV7kCCFVWeBzZpknJ'];

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