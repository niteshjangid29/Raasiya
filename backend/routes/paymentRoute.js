const express = require("express");
const router = express.Router();
const { isAuthenticatedUser } = require("../middleware/auth");
const {
  //   checkout,
  processPayment,
  sendRazorpayApiKey,
  paymentVerification,
} = require("../controllers/paymentController");

// router.route("/checkout").post(checkout);
router.route("/payment/process").post(isAuthenticatedUser, processPayment);
router.route("/razorpayapikey").get(isAuthenticatedUser, sendRazorpayApiKey);
router.route("/paymentverification").post(paymentVerification);

module.exports = router;
