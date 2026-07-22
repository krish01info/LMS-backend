const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// ── Parent Dashboard Stats ──────────────────────────
// StatCards: GPA, Attendance, Pending Fees, Unread Messages
async function getParentStats(parentId) {
  // get child userId from parent_students table
  const link = await prisma.parentStudents.findFirst({
    where: { parentId },
    select: { studentId: true },
  })
  if (!link) return null
  const studentId = link.studentId

  // avg quiz score as GPA proxy
  const quizAvg = await prisma.quizAttempt.aggregate({
    where: { userId: studentId },
    _avg:  { score: true },
  })

  // attendance = completed lessons / total lessons in enrolled courses
  const [completedLessons, totalLessons] = await Promise.all([
    prisma.lessonProgress.count({ where: { userId: studentId, completed: true } }),
    prisma.lessonProgress.count({ where: { userId: studentId } }),
  ])
  const attendance = totalLessons > 0
    ? Math.round((completedLessons / totalLessons) * 100)
    : 0

  // pending fees
  const pendingFees = await prisma.payment.aggregate({
    where: { userId: studentId, status: 'PENDING' },
    _sum:  { amount: true },
  })

  // unread notifications for parent
  const unreadMessages = await prisma.notification.count({
    where: { userId: parentId, isRead: false },
  })

  // GPA = score/100 * 4 scale
  const avgScore = quizAvg._avg.score || 0
  const gpa = ((avgScore / 100) * 4).toFixed(2)

  return {
    studentId,
    gpa,
    attendance:   `${attendance}%`,
    pendingFees:  Number(pendingFees._sum.amount || 0),
    unreadMessages,
  }
}

// ── Subject Performance ─────────────────────────────
// Bar chart — replaces subjectScores mockData
// [{name: subject, value: score}]
async function getSubjectPerformance(studentId) {
  const attempts = await prisma.quizAttempt.findMany({
    where: { userId: studentId },
    select: {
      score: true,
      quiz: {
        select: {
          title: true,
          course: { select: { title: true, category: { select: { name: true } } } },
        },
      },
    },
  })

  // group by course/category
  const subjectMap = {}
  attempts.forEach(a => {
    const subject = a.quiz.course.category?.name || a.quiz.course.title
    if (!subjectMap[subject]) subjectMap[subject] = { total: 0, count: 0 }
    subjectMap[subject].total += a.score
    subjectMap[subject].count += 1
  })

  return Object.entries(subjectMap).map(([subject, data]) => ({
    name:    subject,
    value:   Math.round(data.total / data.count),
    subject, // kept for attendanceBySubject compatibility
    score:   Math.round(data.total / data.count),
  }))
}

// ── Attendance By Subject ───────────────────────────
// replaces attendanceBySubject mockData
// [{subject, percentage}]
async function getAttendanceBySubject(studentId) {
  const enrollments = await prisma.enrollment.findMany({
    where:  { userId: studentId, status: 'ACTIVE' },
    select: {
      course: {
        select: {
          title: true,
          lessons: {
            select: { id: true },
          },
        },
      },
    },
  })

  const result = []
  for (const e of enrollments) {
    const totalLessons = e.course.lessons.length
    if (totalLessons === 0) continue

    const lessonIds = e.course.lessons.map(l => l.id)
    const completed = await prisma.lessonProgress.count({
      where: { userId: studentId, lessonId: { in: lessonIds }, completed: true },
    })

    result.push({
      subject:    e.course.title,
      percentage: Math.round((completed / totalLessons) * 100),
    })
  }
  return result
}

// ── Recent Updates ──────────────────────────────────
// replaces hardcoded recent updates list
async function getRecentUpdates(studentId) {
  const [quizzes, assignments] = await Promise.all([
    prisma.quizAttempt.findMany({
      where:   { userId: studentId },
      take:    3,
      orderBy: { createdAt: 'desc' },
      select:  { score: true, createdAt: true, quiz: { select: { title: true } } },
    }),
    prisma.assignmentSubmission.findMany({
      where:   { userId: studentId },
      take:    3,
      orderBy: { createdAt: 'desc' },
      select:  { grade: true, createdAt: true, assignment: { select: { title: true } } },
    }),
  ])

  const updates = [
    ...quizzes.map(q => ({
      text: `Scored ${q.score}% on ${q.quiz.title}`,
      ts:   q.createdAt,
    })),
    ...assignments.map(a => ({
      text: a.grade
        ? `Got ${a.grade} marks in ${a.assignment.title}`
        : `Submitted ${a.assignment.title}`,
      ts: a.createdAt,
    })),
  ].sort((a, b) => b.ts - a.ts).slice(0, 4)

  return updates.map(u => ({
    text: u.text,
    time: timeAgo(u.ts),
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
  getParentStats,
  getSubjectPerformance,
  getAttendanceBySubject,
  getRecentUpdates,
}
