const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const routes = require('../app/routes/v1')
const { logs } = require('./vars')
const error = require('../app/middlewares/error')
const path = require('path')

const app = express()

// request logging. dev: console | production: file
app.use(morgan(logs))

// parse body params and attache them to req.body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// mount routes
app.use('/', routes)

// set view engine
app.set('view engine', 'pug')
app.set('views', [path.join(__dirname, '../app/./views'), path.join(__dirname, '../.././app')])

// set static path
app.use('/static', express.static(path.join(__dirname, '../.././dist')))

// set static(alt) path
app.use('/static', express.static(path.join(__dirname, '../.././static')))

// if error is not an instanceOf APIError, convert it.
app.use(error.converter)

// catch 404 and forward to error handler
app.use(error.notFound)

// error handler, send stacktrace only during development
app.use(error.handler)

module.exports = app
