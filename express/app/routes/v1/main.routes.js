const express = require('express')
const controllers = require('../../controllers/main.controller')

const router = express.Router()

/**
  * GET /
  */
router
    .route('/')
    .get(controllers.home)


module.exports = router;