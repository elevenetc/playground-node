/**
 * Created by eugene.levenetc on 02/09/16.
 */
const utils = require('../utils/utils');
const request = require('request');
const moment = require('moment');

class JiraRest {

	constructor() {
		this.jiraEnpoint = utils.checkEnvVar('JIRA_ENDPOINT', true);//e.g. https://jdog.atlassian.com/
		this.username = utils.checkEnvVar('JIRA_USERNAME', true);
		this.password = utils.checkEnvVar('JIRA_PASSWORD', true);
		this.dateFormat = 'YYYY-MM-DD';
		this.monday = '';
		this.friday = '';
		this.initDates();
		this.getHours();

		console.log('monday: ' + this.monday);
		console.log('friday: ' + this.friday);
	}

	getHours() {

		const ref = this;

		request({
			url: this.jiraEnpoint + 'rest/tempo-timesheets/3/worklogs/?username=' + this.username + '&dateFrom=' + this.monday + '&dateTo=' + this.friday,
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
				let totalHours = ref.getTotalHours(JSON.parse(body));
				console.log('Total hours: ' + totalHours);
			}
		});
	}

	getAuthHeader() {
		return new Buffer(this.username + ':' + this.password).toString('base64');
	}

	initDates() {
		let day = '';
		let index = 1;
		let fridayIndex;
		while (day != 'Fri') day = moment().subtract(index++, 'days').format('ddd');
		fridayIndex = --index;
		this.friday = moment().subtract(fridayIndex, 'days').format(this.dateFormat);
		this.monday = moment().subtract(fridayIndex + 4, 'days').format(this.dateFormat);
	}

	getTotalHours(response) {
		let result = 0;
		for (let i = 0; i < response.length; i++) {
			let seconds = response[i].timeSpentSeconds;
			result += seconds / 60 / 60;
		}
		return result;
	}

	getEndDate() {
		return moment().subtract(3, 'days').format(this.dateFormat);
	}
}

module.exports = new JiraRest();