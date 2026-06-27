const express = require("express");
const router = express.Router();
const { markLessonComplete, getCourseProgress } = require("../controllers/progress.controller");
const { protect } = require("../middlewares/auth.middleware");
const { authorize } = require("../middlewares/role.middleware");

router.use(protect, authorize("STUDENT"));
router.post("/lesson/:lessonId/complete", markLessonComplete);
router.get("/course/:courseId", getCourseProgress);

module.exports = router;
