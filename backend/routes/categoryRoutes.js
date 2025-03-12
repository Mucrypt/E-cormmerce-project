const express = require('express')
const mongoose = require('mongoose') // Import mongoose
const Category = require('../models/Category')
const {
  authMiddleware,
  adminMiddleware,
} = require('../middleware/authMiddleware') // Import both middlewares
const router = express.Router()

// Helper function to validate ObjectId
const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id)
}

//@Route Create a category (Admin only)
//@desc Create a new category
//@route POST /api/categories
//@access Private/Admin
router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { name, description, subcategories, image, status } = req.body

    // Check if the category already exists
    const existingCategory = await Category.findOne({ name })
    if (existingCategory) {
      return res.status(400).json({ error: 'Category already exists' })
    }

    // Create a new category
    const category = new Category({
      name,
      description,
      subcategories,
      image,
      status,
    })

    await category.save()

    res.status(201).json(category)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Get all categories (Public)
// @desc Get all categories
// @route GET /api/categories
// @access Public
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find().populate('products', 'name price')
    res.status(200).json(categories)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get a single category by ID (Public)
// @desc Get a single category by ID
// @route GET /api/categories/:id
// @access Public
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate(
      'products',
      'name price'
    )

    if (!category) {
      return res.status(404).json({ error: 'Category not found' })
    }

    res.status(200).json(category)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Update a category by ID (Admin only)
// @desc Update a category by ID
// @route PUT /api/categories/:id
// @access Private/Admin
router.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { name, description, subcategories, image, status } = req.body

    // Find the category
    const category = await Category.findById(req.params.id)

    if (!category) {
      return res.status(404).json({ error: 'Category not found' })
    }

    // Update the category
   
    category.name = name || category.name
    category.description = description || category.description
    category.subcategories = subcategories || category.subcategories
    category.image = image || category.image
    category.status = status || category.status

    await category.save()

    res.status(200).json(category)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Delete a category by ID (Admin only)
// @desc Delete a category by ID
// @route DELETE /api/categories/:id
// @access Private/Admin

router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id)

    if (!category) {
      return res.status(404).json({ error: 'Category not found' })
    }

    res.status(200).json({ message: 'Category deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
