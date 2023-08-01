const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
  createProductReview,
  getProductReviews,
  deleteReview,
  getAllCategories,
  getAdminProducts,
  getProductsByCategory,
  getProductsBySubCategory,
} = require("../controllers/productController");
const router = express.Router();
const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth");

router.route("/products").get(getAllProducts);
router
  .route("/admin/products")
  .get(
    isAuthenticatedUser,
    authorizedRoles(["admin", "superadmin"]),
    getAdminProducts
  );
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

router.route("/review").put(isAuthenticatedUser, createProductReview);

router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenticatedUser, deleteReview);

router.route("/categories").get(getAllCategories);

router.route("/categories/:category").get(getProductsByCategory);

router
  .route("/categories/:category/:subCategory")
  .get(getProductsBySubCategory);

module.exports = router;
