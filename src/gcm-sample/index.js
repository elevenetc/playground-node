/**
 * Created by eleven on 18/07/2016.
 */

const gcm = require('node-gcm');
const settings = require('../local-settings');
const http = require('http');
const urlUtils = require('url');
const sender = new gcm.Sender(settings.gcmApiKey);
const regTokens = [settings.testToken];


function handleRequest(request, response) {
	const queryMap = urlUtils.parse(request.url, true).query;
	response.writeHead(200, {
		'Content-Type': 'application/json'
	});
	response.end('{}');
}

function run() {
	http.createServer(handleRequest).listen(8080, function () {
		console.log("Server listening on: http://localhost:%s", 8080);
	});
}

function sendMessage() {
	var message = new gcm.Message({
		data: {key1: 'msg1'}
	});

	sender.send(message, {registrationTokens: regTokens}, function (err, response) {
		if (err) {
			console.error('error: ' + err);
		} else {
			console.log('response:' + response);
		}
	});
}

run();