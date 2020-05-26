const express = require('express')

const router = express.Router({ mergeParams: true })

const {
    getRedeems,
    getRedeem,
    createRedeem,
    updateRedeem
} = require('../controllers/redeems')

router.route('/')
    .get(getRedeems)
    .post(createRedeem)

router.route('/:id')
    .get(getRedeem)
    .put(updateRedeem)

module.exports = router