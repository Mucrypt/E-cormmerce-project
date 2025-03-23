const express = require('express')
const router = express.Router()
const Product = require('../models/product')
const Category = require('../models/Category')

// Helper function to extract unique collections
const extractUniqueCollections = (items) => {
  const collections = new Set()
  items.forEach((item) => {
    if (item.collections && item.collections.length > 0) {
      item.collections.forEach((collection) => {
        collections.add(JSON.stringify(collection)) // Store as string to ensure uniqueness
      })
    }
  })
  return [...collections].map((collection) => JSON.parse(collection)) // Convert back to objects
}

// Get all collections
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({ isPublished: true })
    const categories = await Category.find({ status: 'Active' })

    // Extract unique collections from products and categories
    const productCollections = extractUniqueCollections(products)
    const categoryCollections = extractUniqueCollections(categories)

    // Combine and deduplicate collections
    const allCollections = [
      ...new Set([...productCollections, ...categoryCollections]),
    ]

    res.status(200).json(allCollections)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get products by collection
router.get('/:collection/products', async (req, res) => {
  try {
    const { collection } = req.params
    const products = await Product.find({
      collections: { $elemMatch: { name: collection } }, // Match collection name
      isPublished: true,
    })
      .populate('category', 'name description')
      .select('name price discountPrice rating numReviews images')

    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get categories by collection
router.get('/:collection/categories', async (req, res) => {
  try {
    const { collection } = req.params
    const categories = await Category.find({
      collections: { $elemMatch: { name: collection } }, // Match collection name
      status: 'Active',
    }).select('name description subcategories image')

    res.status(200).json(categories)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
