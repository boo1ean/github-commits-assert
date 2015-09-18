"use strict";

var _ = require('lodash');
var Asserter = require('./asserter');
var Reporter = require('./reporter');
var log = require('./log');

module.exports = class Watchdog {
	constructor (opts) {
		this.asserter = new Asserter(opts.assertions);
		this.reporter = new Reporter(opts.alerting);
	}

	assert (repo, commits) {
		log.info('Start commits asserting');

		return new Promise((resolve, reject) => {
			var errors = this.asserter.validate(repo, commits);

			// No errors - no worries
			if (_.isEmpty(errors)) {
				log.info('Errors not found, good job!');
				return resolve()
			}

			log.info('Unfortunately some errors were found');
			resolve(this.reporter.report(repo, errors));
		});
		
	}
}
