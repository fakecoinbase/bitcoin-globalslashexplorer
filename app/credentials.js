var os = require('os');
var path = require('path');
var url = require('url');

var btcUri = process.env.BGEXP_BITGLOBD_URI ? url.parse(process.env.BGEXP_BITGLOBD_URI, true) : { query: { } };
var btcAuth = btcUri.auth ? btcUri.auth.split(':') : [];

module.exports = {
	rpc: {
		host: btcUri.hostname || process.env.BGEXP_BITGLOBD_HOST || "127.0.0.1",
		port: btcUri.port || process.env.BGEXP_BITGLOBD_PORT || 8332,
		username: btcAuth[0] || process.env.BGEXP_BITGLOBD_USER,
		password: btcAuth[1] || process.env.BGEXP_BITGLOBD_PASS,
		cookie: btcUri.query.cookie || process.env.BGEXP_BITGLOBD_COOKIE || path.join(os.homedir(), '.bitcoin', '.cookie'),
		timeout: parseInt(btcUri.query.timeout || process.env.BGEXP_BITGLOBD_RPC_TIMEOUT || 5000),
	},

	// optional: enter your api access key from ipstack.com below
	// to include a map of the estimated locations of your node's
	// peers
	// format: "ID_FROM_IPSTACK"
	ipStackComApiAccessKey: process.env.BGEXP_IPSTACK_APIKEY,

	// optional: GA tracking code
	// format: "UA-..."
	googleAnalyticsTrackingId: process.env.BGEXP_GANALYTICS_TRACKING,

	// optional: sentry.io error-tracking url
	// format: "SENTRY_IO_URL"
	sentryUrl: process.env.BGEXP_SENTRY_URL,
};
