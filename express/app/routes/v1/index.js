const express = require('express')
const mainRoutes = require('./main.routes')

const router = express.Router()

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.json('ok'))

router.use(mainRoutes)


module.exports = router
