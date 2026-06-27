const express = require("express");
const router = express.Router();
const { enrollInCourse, getMyEnrollments, getEnrolledStudents } = require("../controllers/enrollment.controller");
const { protect } = require("../middlewares/auth.middleware");
const { authorize } = require("../middlewares/role.middleware");

router.use(protect);
router.post("/", authorize("STUDENT"), enrollInCourse);
router.get("/my", authorize("STUDENT"), getMyEnrollments);
router.get("/course/:courseId/students", authorize("TEACHER", "ADMIN"), getEnrolledStudents);

module.exports = router;
