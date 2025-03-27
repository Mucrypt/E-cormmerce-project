const express = require('express')
const Order = require('../models/order')
const {
  authMiddleware,
  adminMiddleware,
} = require('../middleware/authMiddleware')
const { route } = require('./productRoutes')

const router = express.Router()

//@router GET /api/orders/my-orders
//@desc Get logged in user`s orders
//access private
router.get('/my-orders', authMiddleware, async (req, res) => {
  try {
    // Find orders for the authenticated user
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    }) //sort by most recent orders
    res.json(orders)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error' })
  }
})

//@router GET /api/orders/:id
//@desc Get order details by id
//access private

router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      'user',
      'name email'
    )
    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }

    //Return the the full order details
    res.json(order)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error' })
  }
})

module.exports = router