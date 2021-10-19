
const Request = require('request')

//Comman Request for making http request
const commonRequest = function (options) {
    return new Promise((resolve, reject) => {
        Request(options, (error, response, body) => {
            if (error) {
                logError(`RequestWrapper url: ${options.url} and error: ${error}`);
                resolve({});
            } else {
                try {
                    resolve(body);
                } catch (e) {
                    logError(`Catch error url:${url}, requestWrapper url: ${options.url} and error:${e}`);
                    resolve({});
                }
            }
        });
    });
}

module.exports = {
    commonRequest
}