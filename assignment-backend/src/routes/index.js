const fs = require('fs');
const { notFound } = require('../utilities/error-response');
const { OK } = require('../utilities/success-response');
const router = require('express').Router();


fs.readdir(__dirname, (error, files) => {
	logInfo('Please wait while I am configuring the routes for the application...');
	if (error) {
		logError(error);
	} else {
		for (let file of files) {
			if (file !== 'index.js') {
				file = require(`./${file}`);
				router.use(file.url, file.routes);
			}
		}
		logSuccess('Routes are configured successfully...');
	}
});

module.exports = (appInstance) => {
	appInstance.get('/', (req, res) => OK(res, 'You have reached to the APIs.'));

	appInstance.use('/api', router);

	appInstance.use((req, res) => notFound(res, null, 'Oops, this URL does not exist.'));
}