#!/usr/bin/env node

var debug = require("debug");
var debugLog = debug("btcexp:config");

// to debug arg settings, enable the below line:
//debug.enable("btcexp:*");

const args = require('meow')(`
	Usage
	  $ glob-rpc-explorer [options]

	Options
	  -p, --port <port>			  port to bind http server [default: 3002]
	  -i, --host <host>			  host to bind http server [default: 127.0.0.1]
	  -a, --basic-auth-password <..> protect web interface with a password [default: no password]
	  -C, --coin <coin>			  crypto-coin to enable [default: BG]

	  -b, --bitglobd-uri <uri>	   connection URI for bitglobd rpc (overrides the options below)
	  -H, --bitglobd-host <host>	 hostname for bitglobd rpc [default: 127.0.0.1]
	  -P, --bitglobd-port <port>	 port for bitglobd rpc [default: 8332]
	  -c, --bitglobd-cookie <path>   path to bitglobd cookie file [default: ~/.bitcoin/.cookie]
	  -u, --bitglobd-user <user>	 username for bitglobd rpc [default: none]
	  -w, --bitglobd-pass <pass>	 password for bitglobd rpc [default: none]

	  --address-api <option>		 api to use for address queries (options: electrumx, blockchain.com, blockchair.com, blockcypher.com) [default: none]
	  -E, --electrumx-servers <..>   comma separated list of electrum servers to use for address queries; only used if --address-api=electrumx [default: none]

	  --rpc-allowall				 allow all rpc commands [default: false]
	  --rpc-blacklist <methods>	  comma separated list of rpc commands to block [default: see in config.js]
	  --cookie-secret <secret>	   secret key for signed cookie hmac generation [default: hmac derive from bitglobd pass]
	  --demo						 enable demoSite mode [default: disabled]
	  --no-rates					 disable fetching of currency exchange rates [default: enabled]
	  --slow-device-mode			 disable performance-intensive tasks (e.g. UTXO set fetching) [default: enabled]
	  --privacy-mode				 enable privacyMode to disable external data requests [default: disabled]
	  --max-mem <bytes>			  value for max_old_space_size [default: 1024 (1 GB)]

	  --ganalytics-tracking <tid>	tracking id for google analytics [default: disabled]
	  --sentry-url <sentry-url>	  sentry url [default: disabled]

	  -e, --node-env <env>		   nodejs environment mode [default: production]
	  -h, --help					 output usage information
	  -v, --version				  output version number

	Examples
	  $ glob-rpc-explorer --port 8080 --bitglobd-port 18443 --bitglobd-cookie ~/.bitcoin/regtest/.cookie
	  $ glob-rpc-explorer -p 8080 -P 18443 -c ~/.bitcoin/regtest.cookie

	Or using connection URIs
	  $ glob-rpc-explorer -b bitcoin://bob:myPassword@127.0.0.1:18443/
	  $ glob-rpc-explorer -b bitcoin://127.0.0.1:18443/?cookie=$HOME/.bitcoin/regtest/.cookie

	All options may also be specified as environment variables
	  $ BGEXP_PORT=8080 BGEXP_BITGLOBD_PORT=18443 BGEXP_BITGLOBD_COOKIE=~/.bitcoin/regtest/.cookie glob-rpc-explorer


`, {
		flags: {
			port: {alias:'p'},
			host: {alias:'i'},
			basicAuthPassword: {alias:'a'},
			coin: {alias:'C'},
			bitglobdUri: {alias:'b'},
			bitglobdHost: {alias:'H'},
			bitglobdPort: {alias:'P'},
			bitglobdCookie: {alias:'c'},
			bitglobdUser: {alias:'u'},
			bitglobdPass: {alias:'w'},
			demo: {},
			rpcAllowall: {},
			electrumxServers: {alias:'E'},
			nodeEnv: {alias:'e', default:'production'},
			privacyMode: {},
			slowDeviceMode: {}
		}
	}
).flags;

const envify = k => k.replace(/([A-Z])/g, '_$1').toUpperCase();

Object.keys(args).filter(k => k.length > 1).forEach(k => {
	if (args[k] === false) {
		debugLog(`Config(arg): BGEXP_NO_${envify(k)}=true`);

		process.env[`BGEXP_NO_${envify(k)}`] = true;

	} else {
		debugLog(`Config(arg): BGEXP_${envify(k)}=${args[k]}`);

		process.env[`BGEXP_${envify(k)}`] = args[k];
	}
});

require('./www');
