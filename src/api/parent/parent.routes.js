const express    = require('express')
const router     = express.Router()
const controller = require('./parent.controller')

// auth middleware — same jo baaki routes mein use ho raha hai
// const { authenticate, requireRole } = require('../../middleware/auth')
// router.use(authenticate, requireRole('PARENT'))

// GET /api/v1/parent/dashboard
router.get('/dashboard', controller.getDashboard)

module.exports = router
