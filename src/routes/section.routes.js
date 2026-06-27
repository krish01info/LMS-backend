const express = require("express");
const router = express.Router();
const { createSection, updateSection, deleteSection, reorderSections } = require("../controllers/section.controller");
const { protect } = require("../middlewares/auth.middleware");
const { authorize } = require("../middlewares/role.middleware");

router.use(protect, authorize("TEACHER", "ADMIN", "SUPER_ADMIN"));
router.post("/course/:courseId", createSection);
router.put("/:id", updateSection);
router.delete("/:id", deleteSection);
router.put("/course/:courseId/reorder", reorderSections);

module.exports = router;
