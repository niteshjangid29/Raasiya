const Story = require("../models/storyModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const cloudinary = require("cloudinary");
// Create a story
exports.newStory = catchAsyncErrors(async (req, res, next) => {
  const { title, content, images } = req.body;

  const story = await Story.create({
    title,
    content,
    images,
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

// Get Story Details
exports.getSingleStory = catchAsyncErrors(async (req, res, next) => {
  const story = await Story.findById(req.params.id);

  if (!story) {
    return next(new ErrorHandler("Story not found", 404));
  }

  res.status(200).json({
    success: true,
    story,
  });
});

// Update a Story --
exports.updateStory = catchAsyncErrors(async (req, res, next) => {
  let story = await Story.findById(req.params.id);

  if (!story) {
    return next(new ErrorHandler("Story not found", 404));
  }

  // images check

  story = await Story.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    story,
  });
});

// Delete a Story
exports.deleteStory = catchAsyncErrors(async (req, res, next) => {
  const story = await Story.findById(req.params.id);

  if (!story) {
    return next(new ErrorHandler("Story not found", 404));
  }

  // Deleting Images from Cloudinary
  for (let i = 0; i < story.images.length; i++) {
    await cloudinary.v2.uploader.destroy(story.images[i].public_id);
  }

  await story.deleteOne();

  res.status(200).json({
    success: true,
    message: "Story deleted successfully",
  });
});
