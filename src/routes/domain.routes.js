const express = require("express");
const router = express.Router();
const { createDomain, getAllDomains, updateDomain, deleteDomain, assignTeacherToDomain } = require("../controllers/domain.controller");
const { protect } = require("../middlewares/auth.middleware");
const { authorize } = require("../middlewares/role.middleware");

router.get("/", getAllDomains);
router.use(protect);
router.post("/", authorize("ADMIN", "SUPER_ADMIN"), createDomain);
router.put("/:id", authorize("ADMIN", "SUPER_ADMIN"), updateDomain);
router.delete("/:id", authorize("ADMIN", "SUPER_ADMIN"), deleteDomain);
router.post("/:id/assign-teacher", authorize("ADMIN", "SUPER_ADMIN"), assignTeacherToDomain);

module.exports = router;
