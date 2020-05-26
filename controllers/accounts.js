const asyncHandler = require('../middleware/async')

// @desc    Get account entries 
// @route   GET /api/v1/accounts/:id/
// @access  Private
exports.getAccount = asyncHandler(async (req, res, next) => {

    console.log('getAccount')

})