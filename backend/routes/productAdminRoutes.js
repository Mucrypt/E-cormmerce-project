//backend/routes/productAdminRoutes.js
const express = require('express')
const Product = require('../models/product') // Change 'Product' to 'product'
const {
  authMiddleware,
  adminMiddleware,
} = require('../middleware/authMiddleware')
const bcrypt = require('bcryptjs')


const router = express.Router()

// @route GET /api/admin/products
// @desc Get all products (admin only)
// @access Private/Admin
router.get('/products', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const products = await Product.find({})
    res.json(products)
  } catch (error) {
    console.error('Error getting products', error)
    res.status(500).json({ message: 'Server Error' })
  }
})

module.exports = router