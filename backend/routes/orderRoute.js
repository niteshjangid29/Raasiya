const express = require("express");
const router = express.Router();
const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");

router.route("/order/new").post(isAuthenticatedUser, newOrder);
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);
router.route("/orders/me").get(isAuthenticatedUser, myOrders);

router
  .route("/admin/orders")
  .get(
    isAuthenticatedUser,
    authorizedRoles(["admin", "superadmin"]),
    getAllOrders
  );

router
  .route("/admin/order/:id")
  .put(
    isAuthenticatedUser,
    authorizedRoles(["admin", "superadmin"]),
    updateOrder
  )
  .delete(isAuthenticatedUser, authorizedRoles(["superadmin"]), deleteOrder);

module.exports = router;
