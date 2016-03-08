const path = require('path')

// import .env variables
require('dotenv-safe').config({
    path: path.join(__dirname, '../../.env'),
    sample: path.join(__dirname, '../../.env.example')
})
module.exports = {
    port: process.env.PORT,
    env: process.env.NODE_ENV,
    logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev'
}
