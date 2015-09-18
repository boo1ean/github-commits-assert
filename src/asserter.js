"use strict";

var _ = require('lodash');

module.exports = class Asserter {
	constructor (rules) {
		this.rules = rules;
		this.buildRules();
	}

	buildRules () {
		for (let repo in this.rules) {
			this.rules[repo] = buildPredicate(this.rules[repo]);
		}

		function buildPredicate (rule) {
			if (_.isFunction(rule)) {
				return rule;
			}

			if (!_.isString(rule)) {
				throw new Error(`Invalid rule ${JSON.stringify(rule)}`);
			}

			switch (true) {
				case _.startsWith(rule, 'commit message should contain '):
					return (commit) => commit.message.indexOf(rule.slice('commit message should contain '.length)) != -1;
				default:
					throw new Error(`Unsupported rule ${rule}`);
			}
		}
	}

	validate (repo, commits) {
		if (!this.rules[repo]) {
			throw new Error(`Unknow repo ${repo}`);
		}

		var errors = [];
		var isCommitValid = this.rules[repo];

		for (let commit of commits) {
			if (!isCommitValid(commit)) {
				errors.push(commit);
			}
		}

		return errors;
	}
}
