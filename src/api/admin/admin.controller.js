const adminService = require('./admin.service')

// GET /api/admin/dashboard
async function getDashboard(req, res) {
  try {
    const [platformStats, weeklyProgress, recentActivity] = await Promise.all([
      adminService.getPlatformStats(),
      adminService.getWeeklyProgress(),
      adminService.getRecentActivity(),
    ])

    res.json({
      platformStats,
      weeklyProgress,
      recentActivity,
      userDistribution: [
        { name: 'Students', value: platformStats.studentCount },
        { name: 'Teachers', value: platformStats.teacherCount },
        { name: 'Parents',  value: platformStats.parentCount  },
        { name: 'Admins',   value: platformStats.adminCount   },
      ],
    })
  } catch (err) {
    console.error('getDashboard error:', err)
    res.status(500).json({ error: 'Failed to fetch dashboard data' })
  }
}

// GET /api/admin/users?role=student
async function getUsers(req, res) {
  try {
    const { role } = req.query
    const users = await adminService.getAllUsers(role)
    res.json(users)
  } catch (err) {
    console.error('getUsers error:', err)
    res.status(500).json({ error: 'Failed to fetch users' })
  }
}

// GET /api/admin/courses
async function getCourses(req, res) {
  try {
    const courses = await adminService.getAllCourses()
    res.json(courses)
  } catch (err) {
    console.error('getCourses error:', err)
    res.status(500).json({ error: 'Failed to fetch courses' })
  }
}

// GET /api/admin/payments
async function getPayments(req, res) {
  try {
    const payments = await adminService.getPaymentsSummary()
    res.json(payments)
  } catch (err) {
    console.error('getPayments error:', err)
    res.status(500).json({ error: 'Failed to fetch payments' })
  }
}

// GET /api/admin/analytics
async function getAnalytics(req, res) {
  try {
    const analytics = await adminService.getAnalytics()
    res.json(analytics)
  } catch (err) {
    console.error('getAnalytics error:', err)
    res.status(500).json({ error: 'Failed to fetch analytics' })
  }
}

module.exports = { getDashboard, getUsers, getCourses, getPayments, getAnalytics }
