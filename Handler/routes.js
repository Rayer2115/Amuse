const express = require('express')
const router = express.Router()
const logger = require('../Tools/Logger')

logger.load("Loaded the index of routes (/)")

router.all('/', (req, res) => {
    logger.web("Someone landed in [index.hbs]")
    res.render('index')
})

module.exports = router;