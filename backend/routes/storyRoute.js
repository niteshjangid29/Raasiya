const express = require("express");
const router = express.Router();
const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth");
const { newStory, getAllStories } = require("../controllers/storyController");

router
  .route("/admin/story/new")
  .post(isAuthenticatedUser, authorizedRoles(["superadmin"]), newStory);

router.route("/stories").get(getAllStories);

module.exports = router;
