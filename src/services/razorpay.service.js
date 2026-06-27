const Razorpay = require("razorpay");

// TODO: Initialize Razorpay instance
const razorpay = null;
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

const createOrder = async ({ amount, currency = "INR", receipt }) => {
  // TODO: razorpay.orders.create({ amount: amount * 100, currency, receipt })
};

const verifyWebhookSignature = (body, signature) => {
  // TODO: Use crypto to verify Razorpay webhook signature
  // TODO: return true/false
};

const verifyPaymentSignature = ({ orderId, paymentId, signature }) => {
  // TODO: Verify payment signature using HMAC SHA256
};

module.exports = { createOrder, verifyWebhookSignature, verifyPaymentSignature };
