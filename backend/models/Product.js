const mongoose = require('mongoose')

const productsProductsSchema = new mongoose.Schema(
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
    price: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
      default: 0,
    },
    brand: {
      type: String,
      required: true,
      trim: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId, // Reference to Category model
      ref: 'Category', // Name of the referenced model
      required: true,
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        altText: {
          type: String,
        },
      },
    ],
    status: {
      type: String,
      enum: ['Active', 'Inactive'],
      default: 'Active',
    },
    sku: {
      type: String,
      required: true,
      unique: true,
    },
    sizes: {
      type: [String], // Array of available sizes
      default: [],
    },
    colors: {
      type: [String], // Array of available colors
      default: [],
    },
    collections: {
      type: [String], // Array of collection names
      default: [],
    },
    material: {
      type: String,
      default: '',
    },
    careInstructions: {
      type: String,
      default: '',
    },
    gender: {
      type: String,
      enum: ['Men', 'Women', 'Kids', 'Unisex', 'Male', 'Female'],
    },
    attributes: {
      type: Map, // Flexible key-value pairs for attributes
      of: [String], // Values can be an array of strings
      default: {},
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 0,
    },
    totalRatings: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    tags: [String],
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
    },
    metaTitle: {
      type: String,
    },
    metaDescription: {
      type: String,
    },
    metaKeywords: {
      type: String,
    },
    dimensions: {
      type: Map,
      of: String,
      default: {},
    },
    weight: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        customer: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'customer',
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
        helpful: {
          type: Number,
          default: 0,
        },
        notHelpful: {
          type: Number,
          default: 0,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
        updatedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    replies: [
      {
        customer: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'customer',
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    views: {
      type: Number,
      default: 0,
    },
    purchases: {
      type: Number,
      default: 0,
    },
    wishlists: {
      type: Number,
      default: 0,
    },
    dateAdded: {
      type: Date,
      default: Date.now,
    },
  },

  { timestamps: true } // Adds createdAt and updatedAt fields
)

// Check if the model already exists before defining it
const Products =
  mongoose.models.Products || mongoose.model('Products', productsProductsSchema)

module.exports = Products
