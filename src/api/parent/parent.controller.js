const parentService = require('./parent.service')

// GET /api/v1/parent/dashboard
async function getDashboard(req, res) {
  try {
    const parentId = req.user.id  // auth middleware se aayega

    const stats = await parentService.getParentStats(parentId)
    if (!stats) return res.status(404).json({ error: 'No child linked to this parent account' })

    const [subjectPerformance, attendanceBySubject, recentUpdates] = await Promise.all([
      parentService.getSubjectPerformance(stats.studentId),
      parentService.getAttendanceBySubject(stats.studentId),
      parentService.getRecentUpdates(stats.studentId),
    ])

    res.json({
      stats,               // GPA, attendance, pendingFees, unreadMessages
      subjectPerformance,  // bar chart data — replaces subjectScores
      attendanceBySubject, // replaces attendanceBySubject mockData
      recentUpdates,       // replaces hardcoded recent updates
    })
  } catch (err) {
    console.error('getParentDashboard error:', err)
    res.status(500).json({ error: 'Failed to fetch parent dashboard' })
  }
}

module.exports = { getDashboard }
