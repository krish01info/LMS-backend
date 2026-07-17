const express    = require('express')
const router     = express.Router()
const controller = require('./admin.controller')

// middleware — baaki routes mein dekh ke same auth middleware use karna
// const { authenticate, requireRole } = require('../../middleware/auth')
// router.use(authenticate, requireRole('ADMIN'))

// NOTE: registered as /api/v1/admin/* in app.js

router.get('/dashboard', controller.getDashboard)  // platformStats + weeklyProgress + activity
router.get('/users',     controller.getUsers)       // ?role=student filter bhi kaam karta hai
router.get('/courses',   controller.getCourses)
router.get('/payments',  controller.getPayments)
router.get('/analytics', controller.getAnalytics)

module.exports = router
