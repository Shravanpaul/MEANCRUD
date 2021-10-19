const app = require('express')();
const logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const expressSanitizer = require('express-sanitizer')
const mongoConnection = require('./mongo')
const CronJob = require('cron').CronJob;
const cookieParser = require('cookie-parser')
const {config} = require('../config')

const port = process.env.PORT;
const host = process.env.APP_HOST || 'localhost';

const connectToDB = async function () {
    const MAX_TRY_ATTEMPT = 3
    let noOfAttemptTried = 0
    let dbConnected = false
    while (noOfAttemptTried < MAX_TRY_ATTEMPT && !dbConnected) {
        noOfAttemptTried += 1
        const {value} = await mongoConnection.connect()
        if (value) dbConnected = true
    }
    if (dbConnected) {
        return true
    } else {
        throw Error('Unable to connect MongoDB')
    }
}

global.CONFIG = {}

exports.setupApp = async () => {
    let date_end, date_start
	try {
		logInfo('Connecting to DB')
        await connectToDB()
        logInfo('DB Connected')
	} catch (error) {
		logError(error.message)
        process.exit(1)
	}
    CONFIG = config
	app.use(cors());
	app.use(logger('tiny'));
	app.use(bodyParser.json({ limit: '50mb' }))
        app.use(
            bodyParser.urlencoded({
                limit: '50mb',
                extended: true,
                parameterLimit: 100000,
            })
        )
	// mount the express-sanitizer for defend cross side script attack
    // app.use(fileUpload())
    app.use(cookieParser())
    app.use(expressSanitizer())
	const server = app.listen(port, host, () => logSuccess(`Server is listening on port ${port}...`));

	process.on('uncaughtException', (error) => {
		if (error.errno === 'EADDRINUSE') {
			logError('The given port is already occupied. Please provide any other port.');
		} else {
			console.log(error)
		}
        console.log(error.stack || error.message)
		process.exit(1);
	});
    return {app, server};
}