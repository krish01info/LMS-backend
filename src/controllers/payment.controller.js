const asyncHandler = require("../utils/asyncHandler");
const { successResponse, errorResponse } = require("../utils/response");
const prisma = require("../config/db");

// TODO: Import relevant services as needed

const createOrder = asyncHandler(async (req, res) => {
  // TODO: create Razorpay order, save pending payment to DB
  return successResponse(res, {}, "Order created", 201);
});

const verifyPayment = asyncHandler(async (req, res) => {
  // TODO: verify Razorpay signature
  // TODO: update payment status to SUCCESS
  // TODO: create enrollment record
  // TODO: send enrollment confirmation email
  return successResponse(res, {}, "Payment verified");
});

const webhookHandler = asyncHandler(async (req, res) => {
  // TODO: verify webhook signature
  // TODO: handle payment.captured, payment.failed events
  return res.status(200).json({ received: true });
});

module.exports = { createOrder, verifyPayment, webhookHandler };
