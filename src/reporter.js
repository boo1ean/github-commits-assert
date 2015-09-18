"use strict";

var _ = require('lodash');
var nodemailer = require('nodemailer');
var log = require('./log');

_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

module.exports = class Reporter {
	constructor (opts) {
		this.mailOptions = opts.mailOptions;
		this.mailer = nodemailer.createTransport(opts.mailer);
	}

	report (repo, errors) {
		log.info('Sending error message for %s repo there are %s wrong commits', repo, errors.length);

		return new Promise((resolve, reject) => {
			var data = {
				repo: repo,
				username: errors[0].author.username,
				commits: errors,
				time: new Date().toISOString()
			};

			var mail = _.clone(this.mailOptions);

			mail.subject = _.template(mail.subject)(data);
			mail.html = _.template(mail.html)(data);

			this.mailer.sendMail(mail, (error, info) => {
				if (error) {
					log.info('Failed to deliver email', error);
					return reject(error);
				}

				log.info('Successfully delivered email to %s', mail.to);
				resolve(info);
			});
		});
	}
}
