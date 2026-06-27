const express = require("express");
const router = express.Router();
const { getMe, updateProfile, getAllUsers, getUserById, updateUserRole, suspendUser, linkParentStudent } = require("../controllers/user.controller");
const { protect } = require("../middlewares/auth.middleware");
const { authorize } = require("../middlewares/role.middleware");

router.use(protect); // all user routes require auth

router.get("/me", getMe);
router.put("/me", updateProfile);
router.post("/link-parent", linkParentStudent);

// Admin routes
router.get("/", authorize("ADMIN", "SUPER_ADMIN"), getAllUsers);
router.get("/:id", authorize("ADMIN", "SUPER_ADMIN"), getUserById);
router.put("/:id/role", authorize("SUPER_ADMIN"), updateUserRole);
router.put("/:id/suspend", authorize("ADMIN", "SUPER_ADMIN"), suspendUser);

module.exports = router;
