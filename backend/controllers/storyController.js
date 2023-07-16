const Story = require("../models/storyModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Create a story
exports.newStory = catchAsyncErrors(async (req, res, next) => {
  const { title, content } = req.body;

  const story = await Story.create({
    title,
    content,
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    story,
  });
});

// Get All Stories
exports.getAllStories = catchAsyncErrors(async (req, res, next) => {
  const stories = await Story.find();
  const storiesCount = await Story.countDocuments();

  res.status(200).json({
    success: true,
    stories,
    storiesCount,
  });
});
