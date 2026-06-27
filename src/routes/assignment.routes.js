const express = require("express");
const router = express.Router();
const { createAssignment, getAssignmentsByCourse, submitAssignment, gradeSubmission, getSubmissions } = require("../controllers/assignment.controller");
const { protect } = require("../middlewares/auth.middleware");
const { authorize } = require("../middlewares/role.middleware");

router.use(protect);
router.get("/course/:courseId", getAssignmentsByCourse);
router.post("/course/:courseId", authorize("TEACHER"), createAssignment);
router.post("/:id/submit", authorize("STUDENT"), submitAssignment);
router.get("/:id/submissions", authorize("TEACHER"), getSubmissions);
router.put("/submission/:submissionId/grade", authorize("TEACHER"), gradeSubmission);

module.exports = router;
