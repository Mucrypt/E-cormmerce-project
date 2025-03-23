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

// Create a product (Admin only)
//@route POST /api/products
//@desc Create a product
//@access Private (Admin only)
router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { category, ...productData } = req.body

    // Validate category ID
    if (!isValidObjectId(category)) {
      return res.status(400).json({ error: 'Invalid category ID' })
    }

    // Attach the authenticated user's ID to the product
    const product = new Product({
      ...productData,
      category,
      user: req.user._id,
    })
    await product.save()

    res.status(201).json(product)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})


// Update a product by ID (Admin only)
//@route PUT /api/products/:id
//@desc Update a product by ID
//@access Private (Admin only)
router.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { category, ...productData } = req.body

    // Validate product ID
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ error: 'Invalid product ID' })
    }

    // Validate category ID
    if (category && !isValidObjectId(category)) {
      return res.status(400).json({ error: 'Invalid category ID' })
    }

    // Find and update the product
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { ...productData, category },
      { new: true, runValidators: true }
    )

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' })
    }

    res.status(200).json(updatedProduct)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Delete a product by ID (Admin only)
//@route DELETE /api/products/:id
//@desc Delete a product by ID
//@access Private (Admin only)
router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ error: 'Invalid product ID' })
    }

    const product = await Product.findByIdAndDelete(req.params.id)

    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }

    res.status(200).json({ message: 'Product deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

//@route GET /api/products/stats
//@desc Get product statistics
//@access Private (Admin only)
router.get('/stats', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const stats = await Product.aggregate([
      {
        $group: {
          _id: null,
          totalProducts: { $sum: 1 },
          totalStock: { $sum: '$stock' },
          averageRating: { $avg: '$rating' },
        },
      },
    ]);
    res.status(200).json(stats[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//@route GET /api/products/search
//@desc Search products by name, description, or tags
//@access Public
router.get('/search', async (req, res) => {
  try {
    const { query } = req.query;
    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { tags: { $in: [query] } },
      ],
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router