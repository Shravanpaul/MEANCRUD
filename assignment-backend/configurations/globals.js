const { success, error, info } = require('./colors');

module.exports = () => {
	global.logError = (...data) => console.log(error(...data));
	global.logSuccess = (...data) => console.log(success(...data));
	global.logInfo = (...data) => console.log(info(...data));
}