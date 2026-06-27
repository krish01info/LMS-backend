const express = require("express");
const router = express.Router();
const { createOrder, verifyPayment, webhookHandler } = require("../controllers/payment.controller");
const { protect } = require("../middlewares/auth.middleware");

// Webhook - no auth (Razorpay calls this directly)
router.post("/webhook", webhookHandler);

router.use(protect);
router.post("/order", createOrder);
router.post("/verify", verifyPayment);

module.exports = router;
