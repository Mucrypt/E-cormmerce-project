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
      type: [
        {
          id: String, // Explicitly define the `id` field
          name: String,
          image: String,
        },
      ],
      default: [],
    },
    collections: {
      type: [
        {
          _id: String, // Change this to String to accept UUIDs
          name: String, // Collection name
          image: String, // Collection image URL
        },
      ],
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
        ref: 'Product', // Name of the referenced model
      },
    ],
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
)

const Category = mongoose.model('Category', categorySchema)

module.exports = Category
