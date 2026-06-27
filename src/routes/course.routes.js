const express = require("express");
const router = express.Router();
const { createCourse, getAllCourses, getCourseById, updateCourse, deleteCourse, publishCourse, getTeacherCourses } = require("../controllers/course.controller");
const { protect } = require("../middlewares/auth.middleware");
const { authorize } = require("../middlewares/role.middleware");

router.get("/", getAllCourses);
router.get("/:id", getCourseById);
router.use(protect);
router.get("/my/courses", authorize("TEACHER"), getTeacherCourses);
router.post("/", authorize("TEACHER"), createCourse);
router.put("/:id", authorize("TEACHER", "ADMIN", "SUPER_ADMIN"), updateCourse);
router.delete("/:id", authorize("TEACHER", "ADMIN", "SUPER_ADMIN"), deleteCourse);
router.patch("/:id/publish", authorize("TEACHER"), publishCourse);

module.exports = router;
