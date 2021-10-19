
'use strict'

const path = require('path')
const dotenv = require('dotenv')
const envConfPath = path.join(__dirname, '../.env')
dotenv.config({ path: envConfPath })

if (!process.env.NODE_ENV) throw Error('Invalid .env')

const configuration = require('./config')

module.exports = {
    config: configuration,
}