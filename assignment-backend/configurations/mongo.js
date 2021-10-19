const mongoose = require('mongoose')
const { config } = require('../config')

const connect = function () {
    return new Promise((resolve) => {
        mongoose.connect(config.database.APP_DB_URI, {
            useUnifiedTopology: true,
            autoIndex: true,
            autoCreate: true,
            useNewUrlParser: true,
            socketTimeoutMS: 1000,
            connectTimeoutMS: 1000,
        })
        mongoose.connection.setMaxListeners(0)
        mongoose.connection.on('connected', () => {
            resolve({ value: true })
        })
        mongoose.connection.on('error', (error) => {
            resolve({
                error: {
                    type: 'error',
                    message: error.message,
                    data: { message: error.message, stack: error.stack },
                },
            })
        })
        mongoose.connection.on('disconnected', () => {
            logError('disconnected')
        })
    })
}

module.exports = { connect }
