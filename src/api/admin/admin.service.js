const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// ── Platform Stats ──────────────────────────────────
// AdminDashboard StatCards ke liye
async function getPlatformStats() {
  const [totalUsers, activeCourses, revenueData, enrollments, certificates] = await Promise.all([
    prisma.user.count({ where: { isActive: true } }),

    prisma.course.count({ where: { status: 'PUBLISHED' } }),

    prisma.payment.aggregate({
      where: { status: 'COMPLETED' },
      _sum: { amount: true },
    }),

    prisma.enrollment.count(),

    prisma.certificate.count(),
  ])

  const completionRate = enrollments > 0
    ? Math.round((certificates / enrollments) * 100)
    : 0

  // user distribution for pie chart
  const [students, teachers, admins, parents] = await Promise.all([
    prisma.user.count({ where: { role: 'STUDENT',    isActive: true } }),
    prisma.user.count({ where: { role: 'INSTRUCTOR', isActive: true } }),
    prisma.user.count({ where: { role: 'ADMIN',      isActive: true } }),
    // parents = unique parent_id in parent_students
    prisma.parentStudents.findMany({ distinct: ['parentId'], select: { parentId: true } })
      .then(r => r.length),
  ])

  return {
    // exact fields jo frontend platformStats se expect karta hai
    totalUsers,
    activeCourses,
    totalRevenue:   Number(revenueData._sum.amount || 0),
    completionRate,
    // extra for pie chart
    studentCount: students,
    teacherCount: teachers,
    adminCount:   admins,
    parentCount:  parents,
  }
}

// ── Weekly Progress ─────────────────────────────────
// weeklyProgressData replace karta hai — [{name, hours, assignments}]
async function getWeeklyProgress() {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)

  const lessonProgress = await prisma.lessonProgress.findMany({
    where: { updatedAt: { gte: sevenDaysAgo } },
    select: { watchedTime: true, updatedAt: true },
  })

  const submissions = await prisma.assignmentSubmission.findMany({
    where: { createdAt: { gte: sevenDaysAgo } },
    select: { createdAt: true },
  })

  // group by day
  const hoursMap   = {}
  const assignMap  = {}
  days.forEach(d => { hoursMap[d] = 0; assignMap[d] = 0 })

  lessonProgress.forEach(lp => {
    const day = days[new Date(lp.updatedAt).getDay()]
    hoursMap[day] += lp.watchedTime / 3600
  })

  submissions.forEach(s => {
    const day = days[new Date(s.createdAt).getDay()]
    assignMap[day] += 1
  })

  return days.map(d => ({
    name:        d,
    hours:       Math.round(hoursMap[d] * 10) / 10,
    assignments: assignMap[d],
  }))
}

// ── All Users ───────────────────────────────────────
// UsersPage table ke liye
async function getAllUsers(role) {
  const where = role ? { role: role.toUpperCase() } : {}
  const users = await prisma.user.findMany({
    where,
    select: {
      id:         true,
      name:       true,
      email:      true,
      role:       true,
      isActive:   true,
      createdAt:  true,
    },
    orderBy: { createdAt: 'desc' },
    take: 100,
  })

  return users.map(u => ({
    id:     u.id,
    name:   u.name,
    email:  u.email,
    role:   u.role.charAt(0) + u.role.slice(1).toLowerCase(),
    status: u.isActive ? 'Active' : 'Inactive',
  }))
}

// ── All Courses ─────────────────────────────────────
// AdminCoursesPage ke liye
async function getAllCourses() {
  const courses = await prisma.course.findMany({
    select: {
      id:          true,
      title:       true,
      status:      true,
      _count: { select: { enrollments: true } },
    },
    orderBy: { createdAt: 'desc' },
  })

  return courses.map(c => ({
    id:       c.id,
    title:    c.title,
    status:   c.status,
    students: c._count.enrollments,
  }))
}

// ── Payments Summary ────────────────────────────────
// AdminPaymentsPage ke liye — replaces hardcoded ₹24.5L
async function getPaymentsSummary() {
  const now       = new Date()
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)

  const [total, pending, thisMonth] = await Promise.all([
    prisma.payment.aggregate({
      where:  { status: 'COMPLETED' },
      _sum:   { amount: true },
    }),
    prisma.payment.aggregate({
      where:  { status: 'PENDING' },
      _sum:   { amount: true },
    }),
    prisma.payment.aggregate({
      where:  { status: 'COMPLETED', createdAt: { gte: monthStart } },
      _sum:   { amount: true },
    }),
  ])

  return {
    totalRevenue: Number(total._sum.amount   || 0),
    pending:      Number(pending._sum.amount || 0),
    thisMonth:    Number(thisMonth._sum.amount || 0),
  }
}

// ── Analytics ───────────────────────────────────────
// AnalyticsPage ke liye — DAU, New Users, Course Completions, Avg Session
async function getAnalytics() {
  const today      = new Date(); today.setHours(0,0,0,0)
  const weekAgo    = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1)

  const [dau, newUsers, completions, sessions] = await Promise.all([
    // DAU = unique users who had lesson activity today
    prisma.lessonProgress.findMany({
      where:    { updatedAt: { gte: today } },
      distinct: ['userId'],
      select:   { userId: true },
    }).then(r => r.length),

    prisma.user.count({ where: { createdAt: { gte: weekAgo } } }),

    prisma.certificate.count({ where: { issuedAt: { gte: monthStart } } }),

    // avg session = avg watchedTime in minutes this week
    prisma.lessonProgress.aggregate({
      where: { updatedAt: { gte: weekAgo } },
      _avg:  { watchedTime: true },
    }),
  ])

  const avgMins = sessions._avg.watchedTime
    ? Math.round(sessions._avg.watchedTime / 60)
    : 0

  return {
    DAU:               dau,
    newUsers:          `+${newUsers}`,
    courseCompletions: completions,
    avgSession:        `${avgMins}m`,
  }
}

// ── Recent Activity ─────────────────────────────────
// AdminDashboard Recent System Activity ke liye
async function getRecentActivity() {
  const [courses, payments] = await Promise.all([
    prisma.course.findMany({
      take:    3,
      orderBy: { createdAt: 'desc' },
      select:  { title: true, createdAt: true, instructor: { select: { name: true } } },
    }),
    prisma.payment.findMany({
      where:   { status: 'COMPLETED' },
      take:    3,
      orderBy: { createdAt: 'desc' },
      select:  { amount: true, createdAt: true, user: { select: { name: true } } },
    }),
  ])

  const activity = [
    ...courses.map(c => ({
      action: `New course "${c.title}" created`,
      user:   c.instructor.name,
      ts:     c.createdAt,
    })),
    ...payments.map(p => ({
      action: `Payment received ₹${Number(p.amount).toLocaleString('en-IN')}`,
      user:   p.user.name,
      ts:     p.createdAt,
    })),
  ].sort((a, b) => b.ts - a.ts).slice(0, 6)

  return activity.map(a => ({
    action: a.action,
    user:   a.user,
    time:   timeAgo(a.ts),
  }))
}

function timeAgo(date) {
  const diff    = Date.now() - new Date(date).getTime()
  const minutes = Math.floor(diff / 60000)
  if (minutes < 60)  return `${minutes} min ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24)    return `${hours} hour${hours > 1 ? 's' : ''} ago`
  return `${Math.floor(hours / 24)} days ago`
}

module.exports = {
  getPlatformStats,
  getWeeklyProgress,
  getAllUsers,
  getAllCourses,
  getPaymentsSummary,
  getAnalytics,
  getRecentActivity,
}
