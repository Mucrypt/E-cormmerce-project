const mongoose = require('mongoose')

const cartItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    size: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: '',
    },
    quantity: {
      type: Number,
      default: 1,
      min: 1, // Ensure quantity is at least 1
    },
  },
  { _id: false }
)

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    guestId: {
      type: String,
    },
    products: [cartItemSchema],
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
)

// Middleware to calculate totalPrice before saving
cartSchema.pre('save', function (next) {
  this.totalPrice = this.products.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  )
  next()
})

module.exports = mongoose.model('Cart', cartSchema)
