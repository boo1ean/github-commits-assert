## Your github watchdog

Verify commits for containing / not containing specified strings and stuff.

Send alert emails if test fails.

## Installation

```
npm install github-watchdog
```

## Sample usage

Setup github repo hook (only push events) to `http://your-server.com/push` url, where `http://your-server.com` domain of `github-watchdog` application.

Example application config:

```javascript
var startWatchdog = require('gihub-watchdog');

startWatchdog({
	alerting: {
		mailer: {
			service: 'Mandrill',
			auth: {
				user: 'your@email.com',
				pass: '0239c4920ck40jv'
			}
		},

		mailOptions: {
			subject: 'ALARM!!! someone failed something',
			html: 'User {{ username }} failed at {{ repo }}',
			from: 'Github Watchdog <watchdog@your-domain.com>',
			to: 'youremail@example.com, second@example.com'
		},
	},

	// Check if commit message contains jira id
	assertions: {
		'username/repo': 'commit message should contain JIRA-'
	}
});
```
