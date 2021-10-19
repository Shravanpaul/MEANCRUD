const httpCodes = require('./http-codes');
const responseHandler = require('./response-handler');

OK = (res, message, data) => {
	new responseHandler(res, httpCodes.OK, message, data);
}

module.exports = { OK };