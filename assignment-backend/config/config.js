'use strict'

/*
 * Author:Shravan
 */

module.exports = {
    app: {
        port: process.env.PORT,
    },
    database: {
        APP_DB_URI: process.env.APP_DB_URI,
        POOL_SIZE: process.env.POOL_SIZE || 5,
    }
}
