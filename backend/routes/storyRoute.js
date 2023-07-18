const express = require("express");
const router = express.Router();
const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth");
const {
  newStory,
  getAllStories,
  getSingleStory,
  deleteStory,
} = require("../controllers/storyController");

router
  .route("/admin/story/new")
  .post(isAuthenticatedUser, authorizedRoles(["superadmin"]), newStory);

router
  .route("/admin/story/:id")
  .delete(isAuthenticatedUser, authorizedRoles(["superadmin"]), deleteStory);

router.route("/stories").get(getAllStories);

router.route("/story/:id").get(getSingleStory);

module.exports = router;
