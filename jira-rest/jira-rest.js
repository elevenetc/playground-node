/**
 * Created by eugene.levenetc on 02/09/16.
 */
const utils = require('../utils/utils');
const request = require('request');

class JiraRest {

	constructor() {
		this.jiraEnpoint = utils.checkEnvVar('JIRA_ENDPOINT', true);//e.g. https://jdog.atlassian.com/
		this.username = utils.checkEnvVar('JIRA_USERNAME', true);
		this.password = utils.checkEnvVar('JIRA_PASSWORD', true);
		this.getHours();
	}

	getHours() {

		request({
			url: this.jiraEnpoint + 'rest/tempo-timesheets/3/worklogs/?username=' + this.username + '&dateFrom=2016-06-01&dateTo=2016-06-01',
			method: 'GET',
			followRedirect: true,
			headers: {
				'Authorization': 'Basic ' + this.getAuthHeader()
			}
		}, function (error, response, body) {
			if (error) {
				console.log('error');
			} else {
				console.log('status: ' + response.statusCode + ' message: ' + response.statusMessage);
				console.log(body);
			}
		});
	}

	getAuthHeader() {
		return new Buffer(this.username + ':' + this.password).toString('base64');
	}
}

module.exports = new JiraRest();