const express = require("express");
const router = express.Router();
const { getMyNotifications } = require("../controllers/notification.controller");
const { protect } = require("../middlewares/auth.middleware");

router.use(protect);
router.get("/", getMyNotifications);

module.exports = router;
