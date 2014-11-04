var util = require('util')

module.exports = function(res) {
	var vals = res.map(function(i) {
		util.print(i.site.substr(0,3) + ' ' + i.count + '  ')
	})
	console.log('')
}