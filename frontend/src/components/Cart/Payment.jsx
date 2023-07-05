import React, { Fragment, useEffect } from "react";
import MetaData from "../layout/MetaData";
import CheckOutSteps from "./CheckOutSteps";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../../images/Logo.png";
import { clearErrors, createOrder } from "../../actions/orderActions";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const {
      data: { razorpayApiKey },
    } = await axios.get("/api/v1/razorpayapikey");

    const {
      data: { myPayment },
    } = await axios.post("/api/v1/payment/process", paymentData);

    // console.log(razorpayApiKey);
    const options = {
      key: razorpayApiKey,
      amount: myPayment.amount,
      currency: "INR",
      name: "Raasiya",
      description: "Raasiya is an Ecommerce Platform for Home&Living",
      image: Logo,
      order_id: myPayment.id,
      // callback_url: "http://localhost:5000/api/v1/paymentverification",
      handler: async function (response) {
        const data = {
          orderCreationId: myPayment.id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };
        const result = await axios.post(
          "http://localhost:5000/api/v1/paymentverification",
          data,
          { headers: { "Content-Type": "application/json" } }
        );

        if (result.data.isAuthentic) {
          order.paymentInfo = {
            id: result.data.razorpayPaymentId,
            status: "success",
          };

          dispatch(createOrder(order));
          navigate("/success");
          // window.location = `http://localhost:3000/api/paymentsuccess?reference=${data.razorpayPaymentId}`;
        }
      },
      prefill: {
        name: user.name,
        email: user.email,
        contact: shippingInfo.phoneNumber,
      },
      notes: {
        address: "Raasiya Corporate Office",
      },
      theme: {
        color: "#622E10",
      },
    };

    const razor = new window.Razorpay(options);
    razor.open();
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [error, dispatch, alert]);
  return (
    <Fragment>
      <MetaData title="Payment" />
      <CheckOutSteps activeStep={2} />

      <div className="cartAddress">
        <div className="cartAddressLeft">
          <button onClick={submitHandler} className="myBtn">
            Pay
          </button>
        </div>
        <div className="cartAddressRight">
          <div>
            <h3>
              Price Details{" "}
              <span>
                ({cartItems.length} {cartItems.length > 1 ? "Items" : "Item"})
              </span>
            </h3>
          </div>
          <div>
            <p>Subtotal:</p>
            <span>Rs. {orderInfo.subtotal}</span>
          </div>
          <div>
            <p>
              Shipping Charges
              <br />
              (free above 1000):
            </p>
            <span>Rs. {orderInfo.shippingCharges}</span>
          </div>
          <div>
            <p>GST:</p>
            <span>Rs. {orderInfo.tax}</span>
          </div>
          <hr />
          <div>
            <p>
              <strong>Total:</strong>
            </p>
            <span>
              <strong>Rs. {orderInfo.totalPrice}</strong>
            </span>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Payment;
