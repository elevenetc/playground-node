/**
 * Created by eugene.levenetc on 02/09/16.
 */
const utils = require('../utils/utils');
const request = require('request');
const moment = require('moment');
const dateFormat = 'YYYY-MM-DD';

function count(resultHandler, errorHandler, jiraEndpoint = null, username = null, password = null) {

	username = username != null ? username : utils.checkEnvVar('JIRA_USERNAME', true);
	password = password != null ? password : utils.checkEnvVar('JIRA_PASSWORD', true);
	jiraEndpoint = jiraEndpoint != null ? jiraEndpoint : utils.checkEnvVar('JIRA_ENDPOINT', true);

	const dates = initDates();

	request({
		url: jiraEndpoint + 'rest/tempo-timesheets/3/worklogs/?username=' + username + '&dateFrom=' + dates.monday + '&dateTo=' + dates.friday,
		method: 'GET',
		followRedirect: true,
		headers: {
			'Authorization': 'Basic ' + new Buffer(username + ':' + password).toString('base64')
		}
	}, function (error, response, body) {
		if (error) errorHandler(error);
		else resultHandler(getTotalHours(JSON.parse(body)));
	});
}

function initDates() {
	let day = '';
	let index = 1;
	let fridayIndex;
	while (day != 'Fri') day = moment().subtract(index++, 'days').format('ddd');
	fridayIndex = --index;
	let friday = moment().subtract(fridayIndex, 'days').format(dateFormat);
	let monday = moment().subtract(fridayIndex + 4, 'days').format(dateFormat);
	return {monday: monday, friday: friday};
}


function getTotalHours(response) {
	let result = 0;
	for (let i = 0; i < response.length; i++) {
		let seconds = response[i].timeSpentSeconds;
		result += seconds / 60 / 60;
	}
	return result;
}

module.exports = {
	count: count,
	initDates: initDates,
	getTotalHours: getTotalHours
};