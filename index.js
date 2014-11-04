#!/usr/bin/env node

var request = require('request'),
	util = require('util'),
	async = require('async'),
	output = require('./output'),
	config = require('./config.js')


var opts = {
	urlTpl: "https://console.seo4ajax.com/api/v1/sites/SITECODE/count/in-progress",
	json: true,
	headers: {
		"Cookie": "connect.sess=" + config.cookie
	}
}

function processSite(siteCode, cb) {
	opts.url = opts.urlTpl.replace('SITECODE', siteCode)

	request(opts, function(err, resp, body) {
		if (err) return cb(err)
		if (body.error) return cb(body)

		cb(null, {site: body.siteName, count: body.totalCount, active: body.crawlActive})
	})

}

function loop() {

	async.map(config.sites, processSite, function(err, res) {
		if (err) {
			console.log('ERRRR', err)
			return
		}

		output(res)
		setTimeout(loop, 1000)
	})
}

loop()




