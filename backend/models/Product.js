const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
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
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
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
      type: [String],
      default: [],
    },
    colors: {
      type: [String],
      default: [],
    },
    collections: {
      type: [String],
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
      type: Map,
      of: [String],
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
          ref: 'Customer',
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
          ref: 'Customer',
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
  { timestamps: true }
)

const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema)
module.exports = Product
