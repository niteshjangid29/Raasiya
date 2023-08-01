const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter product name"],
    trim: true,
  },
  details: {
    type: String,
    required: [true, "Please enter product details"],
  },
  description: {
    type: String,
    required: [true, "Please enter product description"],
  },
  story: {
    type: String,
    required: [true, "Please enter product story"],
  },
  sku: {
    type: String,
    default: "RAASIYAHOME004",
  },
  price: {
    type: Number,
    required: [true, "Please enter product price"],
    maxLength: [8, "Price cannot exceed 8 characters"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please enter product category"],
  },
  subCategory: {
    type: String,
    required: [true, "Please enter product subCategory"],
  },
  collections: {
    type: String,
    required: [true, "Please enter collections name"],
  },
  Stock: {
    type: Number,
    required: [true, "Please enter product Stock"],
    maxLength: [4, "Stock cannot exceed 4 characters"],
    default: 1,
  },
  numberOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  countryOfOrigin: {
    type: String,
    default: "India",
  },
  registeredAddress: {
    type: String,
    default:
      "Unit No. CA/4, 2nd Floor, Suyog Industrial Estate, LBS Marg, Vikhroli West, Mumbai - 400083",
  },
  packedBy: {
    type: String,
    required: true,
    default: "Raasiya Pvt. Ltd",
  },
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
module.exports = mongoose.model("Product", productSchema);
