const express = require("express");
const router = express.Router();
const { createCategory, getCategoriesByDomain, updateCategory, deleteCategory } = require("../controllers/category.controller");
const { protect } = require("../middlewares/auth.middleware");
const { authorize } = require("../middlewares/role.middleware");

router.get("/domain/:domainId", getCategoriesByDomain);
router.use(protect);
router.post("/", authorize("ADMIN", "SUPER_ADMIN"), createCategory);
router.put("/:id", authorize("ADMIN", "SUPER_ADMIN"), updateCategory);
router.delete("/:id", authorize("ADMIN", "SUPER_ADMIN"), deleteCategory);

module.exports = router;
