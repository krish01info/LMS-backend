const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const { notFound, errorHandler } = require("./middlewares/error.middleware");

// Route imports
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const domainRoutes = require("./routes/domain.routes");
const categoryRoutes = require("./routes/category.routes");
const courseRoutes = require("./routes/course.routes");
const sectionRoutes = require("./routes/section.routes");
const lessonRoutes = require("./routes/lesson.routes");
const enrollmentRoutes = require("./routes/enrollment.routes");
const progressRoutes = require("./routes/progress.routes");
const quizRoutes = require("./routes/quiz.routes");
const assignmentRoutes = require("./routes/assignment.routes");
const paymentRoutes = require("./routes/payment.routes");
const certificateRoutes = require("./routes/certificate.routes");
const notificationRoutes = require("./routes/notification.routes");

const app = express();

// ── Security & Parsing ──
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// ── Rate Limiting ──
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use("/api", limiter);

// ── Health Check ──
app.get("/health", (req, res) => res.json({ status: "OK", timestamp: new Date() }));

// ── Routes ──
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/domains", domainRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/sections", sectionRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/certificates", certificateRoutes);
app.use("/api/notifications", notificationRoutes);

// ── Error Handling ──
app.use(notFound);
app.use(errorHandler);

module.exports = app;
