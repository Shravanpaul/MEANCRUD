const httpCodes = require('./http-codes');
const messages = require('./messages');
const responseHandler = require('./response-handler');

badRequest = (res, data, message) => {
	new responseHandler(res, httpCodes.BAD_REQUEST, message || messages.BAD_REQUEST, data);
}

unauthorized = (res, data, message) => {
	new responseHandler(res, httpCodes.UNAUTHORIZED, message || messages.UNAUTHORIZED, data);
}

notFound = (res, data, message) => {
	new responseHandler(res, httpCodes.NOT_FOUND, message || messages.NOT_FOUND, data);
}

internalServerError = (res, data, message) => {
	new responseHandler(res, httpCodes.INTERNAL_SERVER_ERROR, message || messages.INTERNAL_SERVER_ERROR, data);
}

module.exports = {
	badRequest,
	unauthorized,
	notFound,
	internalServerError
}