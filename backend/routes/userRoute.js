const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUser,
  getSingleUser,
  updateUserRole,
  deleteUser,
} = require("../controllers/userController");
const router = express.Router();
const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(logout);
router.route("/profile").get(isAuthenticatedUser, getUserDetails);
router.route("/password/update").put(isAuthenticatedUser, updatePassword);
router.route("/profile/update").put(isAuthenticatedUser, updateProfile);

router
  .route("/admin/users")
  .get(
    isAuthenticatedUser,
    authorizedRoles(["admin", "superadmin"]),
    getAllUser
  );
router
  .route("/admin/user/:id")
  .get(
    isAuthenticatedUser,
    authorizedRoles(["admin", "superadmin"]),
    getSingleUser
  )
  .put(isAuthenticatedUser, authorizedRoles(["superadmin"]), updateUserRole)
  .delete(isAuthenticatedUser, authorizedRoles(["superadmin"]), deleteUser);

module.exports = router;
