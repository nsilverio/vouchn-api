const asyncHandler = require('../middleware/async')

// @desc    Get account redeems 
// @route   GET /api/v1/accounts/:accountId/redeems
// @access  Private
exports.getRedeems = asyncHandler(async (req, res, next) => {

    res.status(200).json({ success: true, msg: `getRedeems` })

})

// @desc    Get account redeem 
// @route   GET /api/v1/redeems/:id/
// @access  Private
exports.getRedeem = asyncHandler(async (req, res, next) => {

    res.status(200).json({ success: true, msg: `getRedeem` })

})

// @desc    Create account redeem
// @route   POST /api/v1/accounts/:accountId/redeems
// @access  Private
exports.createRedeem = asyncHandler(async (req, res, next) => {

    res.status(200).json({ success: true, msg: `createRedeem` })

})

// @desc    Show/ Hide redeem from list
// @route   PUT /api/v1/redeems/:id/
// @access  Private
exports.updateRedeem = asyncHandler(async (req, res, next) => {

    res.status(200).json({ success: true, msg: `hideRedeem` })
})



