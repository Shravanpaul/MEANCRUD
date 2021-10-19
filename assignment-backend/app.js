require('dotenv').config();
require('./configurations/globals')();
const {setupApp} = require('./configurations/server')


try {
   setupApp().then((data) =>{
    const route = require('./src/routes')
    route(data.app)
   })
} catch (err) {
    logError(`App level error: ${err.stack || err.message || err}`)
}