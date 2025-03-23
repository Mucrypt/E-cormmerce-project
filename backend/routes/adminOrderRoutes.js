const express = require('express')
const Order = require('../models/order')
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware')

const router = express.Router()


//@route GET /api/admin/orders
//desc Get all orders (Admin only)
//access Private
router.get('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user', 'name email')
    res.json(orders)
  } catch (error) {
    console.error('Error getting orders', error)
    res.status(500).json({ message: 'Server Error' })
  }
})

//@route PUT /api/admin/orders/:id
//desc Update order status (Admin only)
//access Private
router.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
    if (order) {
        order.status = req.body.status || order.status
        order.isDelivered = req.body.status === 'delivered' ? true : order.isDelivered
        order.deliveredAt = req.body.status === 'delivered' ? Date.now() : order.deliveredAt

        const updatedOrder = await order.save()
        res.json(updatedOrder)
      
    } else {
      res.status(404).json({ message: 'Order not found' })
    }

    

  } catch (error) {
    console.error('Error updating order:', error)
    res.status(500).json({ message: 'Server Error' })
  }
})

// @route   DELETE /api/admin/orders/:id
// @desc    Delete an order by ID (Admin only)
// @access  Private/Admin
router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const orderId = req.params.id;

    // Check if the order exists
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Delete the order
    await Order.findByIdAndDelete(orderId);

    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ message: 'Server Error' });
  }
})

//@route PUT /api/admin/orders/:id/deliver
//desc Mark order as delivered (Admin only)
//access Private
router.put('/:id/deliver', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
    if (order) {
        order.status = 'Delivered'
        order.isDelivered = true
        order.deliveredAt = Date.now()

        const updatedOrder = await order.save()
        res.json({ order: updatedOrder })
    } else {
      res.status(404).json({ message: 'Order not found' })
    }
  } catch (error) {
    console.error('Error updating order:', error)
    res.status(500).json({ message: 'Server Error' })
  }
})

router.get(
  '/total-sales',
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const totalSales = await Order.aggregate([
        {
          $match: {
            $or: [
              { status: 'Delivered' }, // Include delivered orders
              { status: 'Paid' }, // Include paid orders
            ],
          },
        },
        {
          $group: {
            _id: null,
            totalSales: { $sum: '$totalPrice' }, // Sum up totalPrice for matching orders
          },
        },
      ])

      console.log('Aggregation Result:', totalSales) // Debugging line

      res.json({
        totalSales: totalSales.length > 0 ? totalSales[0].totalSales : 0,
      })
    } catch (error) {
      console.error('Error calculating total sales:', error)
      res.status(500).json({ message: 'Server Error' })
    }
  }
)

module.exports = router