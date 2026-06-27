const express = require("express");
const router = express.Router();
const { createLesson, updateLesson, deleteLesson, getLessonById } = require("../controllers/lesson.controller");
const { protect } = require("../middlewares/auth.middleware");
const { authorize } = require("../middlewares/role.middleware");

router.use(protect);
router.get("/:id", getLessonById); // requires enrollment check inside controller
router.post("/section/:sectionId", authorize("TEACHER"), createLesson);
router.put("/:id", authorize("TEACHER"), updateLesson);
router.delete("/:id", authorize("TEACHER"), deleteLesson);

module.exports = router;
