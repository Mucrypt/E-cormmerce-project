const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    subcategories: {
      type: [String], // Array of subcategory names
      default: [],
    },
    image: {
      type: String, // URL of the category image
      default: '',
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive'],
      default: 'Active',
    },
    productCount: {
      type: Number,
      default: 0,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId, // Reference to Product model
        ref: 'Products', // Name of the referenced model
      },
    ],
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
)

const Category = mongoose.model('Category', categorySchema)

module.exports = Category
