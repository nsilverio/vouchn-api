const express = require('express')

const router = express.Router()

// Include external resource's router
const redeemsRouter = require('./redeems')

// Re-route into external resource's routes
router.use('/:accountId/redeems', redeemsRouter)

const {
    getAccount,
} = require('../controllers/accounts')

router.route('/:id')
    .get(getAccount)


module.exports = router