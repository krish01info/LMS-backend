const express = require("express");
const router = express.Router();
const { createQuiz, getQuizzesByCourse, getQuizById, submitQuiz, getMyAttempts, deleteQuiz } = require("../controllers/quiz.controller");
const { protect } = require("../middlewares/auth.middleware");
const { authorize } = require("../middlewares/role.middleware");

router.use(protect);
router.get("/course/:courseId", getQuizzesByCourse);
router.get("/:id", getQuizById);
router.post("/course/:courseId", authorize("TEACHER"), createQuiz);
router.delete("/:id", authorize("TEACHER"), deleteQuiz);
router.post("/:id/submit", authorize("STUDENT"), submitQuiz);
router.get("/my/attempts", authorize("STUDENT"), getMyAttempts);

module.exports = router;
