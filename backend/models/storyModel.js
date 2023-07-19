const mongoose = require("mongoose");

const storySchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter a Story Title"],
    trim: true,
  },
  content: {
    type: String,
    require: [true, "Please enter Story Content"],
  },
  thumbnail: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  images: [
    {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Story", storySchema);
