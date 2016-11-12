/**
 * Created by eugene.levenetc on 02/09/16.
 */
const assert = require('assert');
const sinon = require('sinon');
const jiraHoursCounter = require('./jira-hours-counter');

describe('Check basic function of jira-hours-counter', function () {

	before(function () {

	});

	it('seconds should be converted into hours', function () {
		assert.equal(jiraHoursCounter.getTotalHours([{timeSpentSeconds: 60 * 60}]), 1);
		assert.equal(jiraHoursCounter.getTotalHours([{timeSpentSeconds: 60 * 60}, {timeSpentSeconds: 60 * 60}]), 2);
		assert.equal(jiraHoursCounter.getTotalHours([{timeSpentSeconds: 60 * 60}, {timeSpentSeconds: 60 * 30}]), 1.5);
	});

	it('monday and friday should be initialized properly', function () {
		var dates = jiraHoursCounter.initDates();
		console.log(dates);
	})
});