const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: [true, "Price must be provided"],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 4.9,
  },
  image: [
    {
      type: Object,
    },
  ],
  description: {
    type: String,
    required: true,
  },
  shipping: {
    type: Boolean,
    default: true,
  },
  colors: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  stock: {
    type: Number,
    required: true,
  },
  reviews: {
    type: Number,
    required: true,
  },
  stars: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    enum: {
      values: [
        "apple",
        "samsung",
        "dell",
        "mi",
        "nokia",
        "asus",
        "lenovo",
        "rolex",
      ],
      message: `{VALUE} is not supported`,
    },
  },
});

module.exports = mongoose.model("Product", productSchema);
