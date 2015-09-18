"use strict";

var _ = require('lodash');
var Asserter = require('./asserter');
var Reporter = require('./reporter');

module.exports = class Watchdog {
	constructor (opts) {
		this.asserter = new Asserter(opts.assertions);
		this.reporter = new Reporter(opts.alerting);
	}

	assert (repo, commits) {
		return new Promise((resolve, reject) => {
			var errors = this.asserter.validate(repo, commits);

			// No errors - no worries
			if (_.isEmpty(errors)) {
				return resolve()
			}

			resolve(reporter.report(repo, errors));
		});
		
	}
}
