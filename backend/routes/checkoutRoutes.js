const express = require('express')
const Checkout = require('../models/checkout')
const Cart = require('../models/Cart') // Updated casing
const Product = require('../models/product') // Updated casing
const Order = require('../models/order')
const {
  authMiddleware,
  adminMiddleware,
} = require('../middleware/authMiddleware')
const { route } = require('./productRoutes')

const { isValidObjectId } = require('mongoose')

const router = express.Router()
//@route POST /api/checkout
//@desc Create a new checkout session
//@access Private

router.post('/', authMiddleware, async (req, res) => {
  const { CheckoutItems, paymentMethod, shippingAddress, totalPrice } = req.body

  // Validate CheckoutItems
  if (!CheckoutItems || CheckoutItems.length === 0) {
    return res.status(400).json({ message: 'No items in checkout' })
  }

  // Validate each item in CheckoutItems
  for (const item of CheckoutItems) {
    if (
      !item.productId ||
      !item.name ||
      !item.price ||
      !item.quantity ||
      !item.image
    ) {
      return res.status(400).json({ message: 'Invalid item in CheckoutItems' })
    }
  }

  try {
    // Create a new checkout session
    const newCheckout = await Checkout.create({
      user: req.user._id,
      checkoutItems: CheckoutItems, // Ensure this matches the schema field name
      paymentMethod,
      shippingAddress,
      totalPrice,
      paymentStatus: 'Pending',
      isPaid: false,
    })

    console.log(`Checkout created for user ${req.user._id}`)
    res.status(201).json(newCheckout)
  } catch (error) {
    console.error('Error creating checkout', error)
    res.status(500).json({ message: 'Server Error' })
  }
})

//@route GET /api/checkout/:id/pay
//@desc Update payment status to mark as paid after successful payment
//@access Private
router.put('/:id/pay', authMiddleware, async (req, res) => {
  const { paymentStatus, paymentDetails } = req.body

  try {
    //Find the checkout session
    const checkout = await Checkout.findById(req.params.id)

    if (!checkout) {
      return res.status(404).json({ message: 'Checkout not found' })
    }

    //Check if the payment status is paid
    if (paymentStatus === 'Paid') {
      //Update the payment status
      checkout.isPaid = true
      checkout.paymentStatus = paymentStatus
      checkout.paymentDetails = paymentDetails
      checkout.paidAt = Date.now()

      //Save the updated checkout session
      await checkout.save()

      res.status(200).json(checkout)
    } else {
      return res.status(400).json({ message: 'Invalid payment status' })
    }
  } catch (error) {
    console.error('Error updating payment status', error)
    res.status(500).json({ message: 'Server Error' })
  }
})

//@route GET /api/checkout/:id/finalize
//@desc Finalize the checkout session and create an order
//@

router.post('/:id/finalize', authMiddleware, async (req, res) => {
  try {
    // Validate the checkout ID
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid Checkout ID' })
    }

    // Find the checkout session
    const checkout = await Checkout.findById(req.params.id)

    if (!checkout) {
      return res.status(404).json({ message: 'Checkout not found' })
    }

    // Check if CheckoutItems is empty
    if (!checkout.checkoutItems || checkout.checkoutItems.length === 0) {
      return res.status(400).json({ message: 'No items in checkout' })
    }

    if (checkout.isPaid && !checkout.isFinalized) {
      // Create final order based on the checkout details
      const finalOrder = await Order.create({
        user: checkout.user,
        orderItems: checkout.checkoutItems.map((item) => ({
          productId: item.productId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        shippingAddress: checkout.shippingAddress,
        paymentMethod: checkout.paymentMethod,
        totalPrice: checkout.totalPrice,
        paymentDetails: checkout.paymentDetails,
        isPaid: true,
        paidAt: checkout.paidAt,
        isDelivered: false,
        paymentStatus: 'Paid',
      })

      // Mark the checkout as finalized to prevent duplicate orders
      checkout.isFinalized = true
      checkout.finalizedAt = Date.now()
      await checkout.save()

      // Delete the cart associated with the user
      await Cart.findOneAndDelete({ user: checkout.user })

      // Update the stock count for each product in the order
      for (const item of finalOrder.orderItems) {
        const product = await Product.findById(item.productId)
        if (product) {
          product.stock -= item.quantity
          await product.save()
        }
      }

      return res.status(201).json(finalOrder)
    } else if (checkout.isFinalized) {
      return res.status(400).json({ message: 'Checkout already finalized' })
    } else {
      return res.status(400).json({ message: 'Checkout not paid' })
    }
  } catch (error) {
    console.error('Error finalizing checkout', error)
    return res.status(500).json({ message: 'Server Error' })
  }
})
module.exports = router
