const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const path = require("path");
const config = require("./config");

// ─── Route Imports ────────────────────────────────────────────────────────────
const userRoutes        = require("./api/users/users.routes");
const courseRoutes      = require("./api/courses/courses.routes");
const lessonRoutes      = require("./api/lessons/lessons.routes");
const assignmentRoutes  = require("./api/assignments/assignments.routes");

// ─── Error Handler ────────────────────────────────────────────────────────────
// const errorHandler = require("./middleware/errorHandler"); // enable when implemented

const app = express();

// ─── Security & Compression ───────────────────────────────────────────────────
app.use(helmet());
app.use(cors({ origin: config.clientUrl, credentials: true }));
app.use(compression());

// ─── Logging ──────────────────────────────────────────────────────────────────
if (config.env !== "test") {
  app.use(morgan("dev"));
}

// ─── Body Parsers ─────────────────────────────────────────────────────────────
// NOTE: Do NOT add express.json() before multer routes — multer handles multipart.
//       These parsers handle JSON / URL-encoded payloads for non-file routes.
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// ─── Static: local dev uploads (disabled in production — use S3/Supabase) ────
if (config.env === "development") {
  app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));
}

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", env: config.env, timestamp: new Date().toISOString() });
});

// ─── API Routes ───────────────────────────────────────────────────────────────
const API = "/api/v1";

app.use(`${API}/users`,       userRoutes);       // PATCH /users/me/avatar
app.use(`${API}/courses`,     courseRoutes);     // POST  /courses/:id/thumbnail
                                                 // POST  /courses/:id/resources
app.use(`${API}/sections/:sectionId/lessons`, lessonRoutes); // POST /sections/:id/lessons/:id/video
app.use(`${API}/assignments`, assignmentRoutes); // POST  /assignments/:id/submit
                                                 // PATCH /assignments/submissions/:id/grade

// ─── 404 Handler ─────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, statusCode: 404, message: `Route not found: ${req.method} ${req.originalUrl}` });
});

// ─── Global Error Handler ─────────────────────────────────────────────────────
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    statusCode,
    message: err.message || "Internal Server Error",
    errors: err.errors || [],
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

module.exports = app;
