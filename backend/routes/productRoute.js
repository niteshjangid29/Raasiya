const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
} = require("../controllers/productController");
const router = express.Router();
const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth");

router.route("/products").get(getAllProducts);
router
  .route("/admin/product/new")
  .post(
    isAuthenticatedUser,
    authorizedRoles(["admin", "superadmin"]),
    createProduct
  );
router
  .route("/admin/product/:id")
  .put(
    isAuthenticatedUser,
    authorizedRoles(["admin", "superadmin"]),
    updateProduct
  )
  .delete(isAuthenticatedUser, authorizedRoles(["superadmin"]), deleteProduct);
router.route("/product/:id").get(getSingleProduct);

module.exports = router;
