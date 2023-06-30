const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Razorpay = require("razorpay");
const crypto = require("crypto");

exports.processPayment = catchAsyncErrors(async (req, res, next) => {
  const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET,
  });

  const options = {
    amount: req.body.amount,
    currency: "INR",
    receipt: "order_rcptid_11",
  };

  const myPayment = await instance.orders.create(options);

  // console.log(myPayment);
  res.status(200).json({
    success: true,
    myPayment,
    // client_secret: myPayment.client_secret,
  });
});

exports.paymentVerification = catchAsyncErrors(async (req, res, next) => {
  // console.log(req.body);
  // const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
  //   req.body;

  const {
    orderCreationId,
    razorpayPaymentId,
    razorpayOrderId,
    razorpaySignature,
  } = req.body;

  const body = razorpayOrderId + "|" + razorpayPaymentId;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(body.toString())
    .digest("hex");

  // console.log("sig recieved", razorpaySignature);
  // console.log("sig generated", expectedSignature);

  // const signature = req.headers["x-razorpay-signature"];

  // console.log(razorpay_order_id);
  // console.log(razorpay_payment_id);
  // console.log(razorpay_signature);
  // console.log(signature);
  // const body = razorpay_order_id + "|" + razorpay_payment_id;

  // const expectedSignature = crypto
  //   .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
  //   .update(body.toString())
  //   .digest("hex");
  // console.log("sig recieved", razorpay_signature);
  // console.log("sig generated", expectedSignature);

  const isAuthentic = expectedSignature === razorpaySignature;

  // if (isAuthentic) {
  //   // Database
  //   res.redirect(
  //     `http://localhost:3000/paymentsuccess?reference=${razorpayPaymentId}`
  //   );
  // } else {
  //   res.status(400).json({
  //     success: false,
  //   });
  // }
  // console.log(isAuthentic);

  res.status(200).json({
    success: true,
    isAuthentic,
    razorpayPaymentId,
  });
});

exports.sendRazorpayApiKey = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({
    razorpayApiKey: process.env.RAZORPAY_API_KEY,
  });
});

// exports.checkout = catchAsyncErrors(async (req, res, next) => {
//   const instance = new Razorpay({
//     key_id: process.env.RAZORPAY_API_KEY,
//     key_secret: process.env.RAZORPAY_API_SECRET,
//   });

//   const options = {
//     amount: 50000,
//     currency: "INR",
//     receipt: "order_rcptid_11",
//   };

//   const order = await instance.orders.create(options);

//   console.log(order);

//   res.status(200).json({
//     success: true,
//   });
// });
