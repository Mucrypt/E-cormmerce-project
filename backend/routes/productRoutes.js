const express = require('express')
const mongoose = require('mongoose')
const Product = require('../models/Product')
const {
  authMiddleware,
  adminMiddleware,
} = require('../middleware/authMiddleware')
const router = express.Router()

// Helper function to validate ObjectId
const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id)
}

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

// Get all products (Public) with pagination, filtering, and sorting
//@route GET /api/products
//@desc Get all products
//@access Public
router.get('/', async (req, res) => {
  try {
    const {
      category,
      status,
      isFeatured,
      isPublished,
      sort,
      page = 1,
      limit = 10,
    } = req.query

    // Build filter
    const filter = {}
    if (category) filter.category = category
    if (status) filter.status = status
    if (isFeatured) filter.isFeatured = isFeatured === 'true'
    if (isPublished) filter.isPublished = isPublished === 'true'

    // Build sort options
    const sortOptions = {}
    if (sort) {
      const [field, order] = sort.split(':')
      sortOptions[field] = order === 'desc' ? -1 : 1
    }

    // Pagination
    const pageInt = parseInt(page, 10)
    const limitInt = parseInt(limit, 10)
    if (isNaN(pageInt))
      return res.status(400).json({ error: 'Invalid page value' })
    if (isNaN(limitInt))
      return res.status(400).json({ error: 'Invalid limit value' })

    const products = await Product.find(filter)
      .sort(sortOptions)
      .skip((pageInt - 1) * limitInt)
      .limit(limitInt)
      .populate('category', 'name description')
      .populate('customer', 'name email')

    const totalProducts = await Product.countDocuments(filter)

    res.status(200).json({
      products,
      totalProducts,
      totalPages: Math.ceil(totalProducts / limitInt),
      currentPage: pageInt,
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})
//@route GET /api/products/top-rated
//@desc Get top-rated products
//@access Public
router.get('/top-rated', async (req, res) => {
  try {
    const { limit = 5 } = req.query

    const topRatedProducts = await Product.find({ isPublished: true })
      .sort({ rating: -1, numReviews: -1 }) // Sort by rating and number of reviews
      .limit(parseInt(limit, 10))
      .select('name rating numReviews price discountPrice images')

    res.status(200).json(topRatedProducts)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

//@route GET /api/products/featured for home page
//@desc Get featured products
//@access Public
router.get('/featured', async (req, res) => {
  try {
    const { limit = 5 } = req.query

    const featuredProducts = await Product.find({
      isFeatured: true,
      isPublished: true,
    })
      .limit(parseInt(limit, 10))
      .select('name rating numReviews price discountPrice images')

    res.status(200).json(featuredProducts)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

//@route GET /api/products/new-arrivals
//@desc Get the latest 8 products (new arrivals)
//@access Public
router.get('/new-arrivals', async (req, res) => {
  try {
    const limit = 8 // Retrieve the latest 8 products

    // Fetch new arrivals
    const newArrivals = await Product.find({ isPublished: true })
      .sort({ createdAt: -1 }) // Sort by creation date (newest first)
      .limit(limit) // Limit to 8 products
      .select('name price discountPrice rating numReviews images createdAt') // Select specific fields

    res.status(200).json(newArrivals)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

//@route GET /api/products/:id/summary
//@desc Get product summary (reviews, rating, stock, etc.)
//@access Public
router.get('/:id/summary', async (req, res) => {
  try {
    // Validate product ID
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ error: 'Invalid product ID' })
    }

    const product = await Product.findById(req.params.id)

    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }

    // Calculate discount percentage
    const discountPercentage =
      product.discountPrice > 0
        ? Math.round(
            ((product.price - product.discountPrice) / product.price) * 100
          )
        : 0

    // Prepare summary data
    const summary = {
      name: product.name,
      rating: product.rating,
      numReviews: product.numReviews,
      stock: product.stock,
      price: product.price,
      discountPrice: product.discountPrice,
      discountPercentage,
      isFeatured: product.isFeatured,
      isPublished: product.isPublished,
      status: product.status,
      brand: product.brand,
      category: product.category,
      images: product.images,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    }

    res.status(200).json(summary)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

//@route GET /api/products/:id/reviews/stats
//@desc Get review statistics (rating distribution, average rating, etc.)
//@access Public
router.get('/:id/reviews/stats', async (req, res) => {
  try {
    // Validate product ID
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ error: 'Invalid product ID' })
    }

    const product = await Product.findById(req.params.id)

    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }

    // Calculate rating distribution
    const ratingDistribution = {
      5: product.reviews.filter((review) => review.rating === 5).length,
      4: product.reviews.filter((review) => review.rating === 4).length,
      3: product.reviews.filter((review) => review.rating === 3).length,
      2: product.reviews.filter((review) => review.rating === 2).length,
      1: product.reviews.filter((review) => review.rating === 1).length,
    }

    // Prepare review statistics
    const reviewStats = {
      totalReviews: product.numReviews,
      averageRating: product.rating,
      ratingDistribution,
    }

    res.status(200).json(reviewStats)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})



//@route GET /api/products/collections/:collection
//@desc Get products by collection
//@access Public
router.get('/collections/:collection', async (req, res) => {
  try {
    const { page = 1, limit = 10, sort = 'createdAt:desc' } = req.query
    const { collection } = req.params

    // Build filter
    const filter = { collections: collection, isPublished: true }

    // Build sort options
    const sortOptions = {}
    if (sort) {
      const [field, order] = sort.split(':')
      sortOptions[field] = order === 'desc' ? -1 : 1
    }

    // Pagination
    const pageInt = parseInt(page, 10)
    const limitInt = parseInt(limit, 10)
    if (isNaN(pageInt))
      return res.status(400).json({ error: 'Invalid page value' })
    if (isNaN(limitInt))
      return res.status(400).json({ error: 'Invalid limit value' })

    const products = await Product.find(filter)
      .sort(sortOptions)
      .skip((pageInt - 1) * limitInt)
      .limit(limitInt)
      .select('name price discountPrice rating numReviews images collections')

    const totalProducts = await Product.countDocuments(filter)

    res.status(200).json({
      products,
      totalProducts,
      totalPages: Math.ceil(totalProducts / limitInt),
      currentPage: pageInt,
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

//@route GET /api/products/sort
//@desc Sort products by price, new arrivals, or popularity
//@access Public
router.get('/sort', async (req, res) => {
  try {
    const { sortBy, page = 1, limit = 10 } = req.query

    // Validate sortBy parameter
    const validSortOptions = [
      'priceLowToHigh',
      'priceHighToLow',
      'newArrivals',
      'popularity',
    ]
    if (!validSortOptions.includes(sortBy)) {
      return res.status(400).json({ error: 'Invalid sort option' })
    }

    // Build sort options
    let sortOptions = {}
    switch (sortBy) {
      case 'priceLowToHigh':
        sortOptions = { price: 1 } // Ascending order
        break
      case 'priceHighToLow':
        sortOptions = { price: -1 } // Descending order
        break
      case 'newArrivals':
        sortOptions = { createdAt: -1 } // Newest first
        break
      case 'popularity':
        sortOptions = { rating: -1, numReviews: -1 } // Highest rating and most reviews first
        break
      default:
        sortOptions = { createdAt: -1 } // Default to new arrivals
    }

    // Pagination
    const pageInt = parseInt(page, 10)
    const limitInt = parseInt(limit, 10)
    if (isNaN(pageInt))
      return res.status(400).json({ error: 'Invalid page value' })
    if (isNaN(limitInt))
      return res.status(400).json({ error: 'Invalid limit value' })

    // Fetch products
    const products = await Product.find({ isPublished: true })
      .sort(sortOptions)
      .skip((pageInt - 1) * limitInt)
      .limit(limitInt)
      .select('name price discountPrice rating numReviews images createdAt')

    const totalProducts = await Product.countDocuments({ isPublished: true })

    res.status(200).json({
      products,
      totalProducts,
      totalPages: Math.ceil(totalProducts / limitInt),
      currentPage: pageInt,
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})
//@route GET /api/products/best-sellers
//@desc Get best-selling products (sorted by highest number of reviews and rating)
//@access Public
router.get('/best-sellers', async (req, res) => {
  try {
    const { limit = 5 } = req.query // Default to 5 products

    // Fetch best-selling products
    const bestSellers = await Product.aggregate([
      { $match: { isPublished: true } }, // Only include published products
      {
        $sort: {
          numReviews: -1, // Sort by number of reviews (descending)
          rating: -1, // Then sort by rating (descending)
        },
      },
      { $limit: parseInt(limit, 10) }, // Limit the number of results
      {
        $project: {
          name: 1,
          price: 1,
          discountPrice: 1,
          rating: 1,
          numReviews: 1,
          images: 1,
          createdAt: 1,
        },
      },
    ])

    res.status(200).json(bestSellers)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

//@route PUT /api/products/:id/collections/add
//@desc Add a product to a collection
//@access Private (Admin only)
router.put(
  '/:id/collections/add',
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const { collection } = req.body

      // Validate product ID
      if (!isValidObjectId(req.params.id)) {
        return res.status(400).json({ error: 'Invalid product ID' })
      }

      // Validate collection
      if (!collection || typeof collection !== 'string') {
        return res.status(400).json({ error: 'Invalid collection name' })
      }

      const product = await Product.findById(req.params.id)

      if (!product) {
        return res.status(404).json({ error: 'Product not found' })
      }

      // Add collection if it doesn't already exist
      if (!product.collections.includes(collection)) {
        product.collections.push(collection)
        await product.save()
      }

      res.status(200).json(product)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
)

//@route PUT /api/products/:id/collections/remove
//@desc Remove a product from a collection
//@access Private (Admin only)
router.put(
  '/:id/collections/remove',
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const { collection } = req.body

      // Validate product ID
      if (!isValidObjectId(req.params.id)) {
        return res.status(400).json({ error: 'Invalid product ID' })
      }

      // Validate collection
      if (!collection || typeof collection !== 'string') {
        return res.status(400).json({ error: 'Invalid collection name' })
      }

      const product = await Product.findById(req.params.id)

      if (!product) {
        return res.status(404).json({ error: 'Product not found' })
      }

      // Remove collection if it exists
      product.collections = product.collections.filter(
        (col) => col !== collection
      )
      await product.save()

      res.status(200).json(product)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
)
// Get a single product by ID (Public)
//@route GET /api/products/:id
//@desc Get a single product by ID
//@access Public
router.get('/:id', async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ error: 'Invalid product ID' })
    }

    const product = await Product.findById(req.params.id)
      .populate('category', 'name description')
      .populate('user', 'name email')

    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }

    res.status(200).json(product)
  } catch (error) {
    res.status(500).json({ error: error.message })
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

// Add a review to a product (Authenticated users only)
//@route POST /api/products/:id/reviews
//@desc Add a review to a product
//@access Private
router.post('/:id/reviews', authMiddleware, async (req, res) => {
  try {
    const { name, rating, comment } = req.body

    // Validate input
    if (!name || !rating || !comment) {
      return res
        .status(400)
        .json({ error: 'Name, rating, and comment are required' })
    }

    // Validate product ID
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ error: 'Invalid product ID' })
    }

    const product = await Product.findById(req.params.id)

    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }

    // Check if the user has already reviewed the product
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      return res
        .status(400)
        .json({ error: 'You have already reviewed this product' })
    }

    // Add the review
    const review = { name, rating, comment, user: req.user._id }
    product.reviews.push(review)
    product.numReviews = product.reviews.length
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length

    await product.save()

    res.status(201).json(product)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

//@route GET /api/products/:id/reviews
//@desc Get product reviews with pagination
//@access Public
router.get('/:id/reviews', async (req, res) => {
  try {
    const { page = 1, limit = 10, sort = 'createdAt:desc' } = req.query

    // Validate product ID
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ error: 'Invalid product ID' })
    }

    const product = await Product.findById(req.params.id)

    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }

    // Sort reviews
    const [field, order] = sort.split(':')
    const sortedReviews = product.reviews.sort((a, b) => {
      if (order === 'desc') {
        return new Date(b[field]) - new Date(a[field])
      } else {
        return new Date(a[field]) - new Date(b[field])
      }
    })

    // Pagination
    const pageInt = parseInt(page, 10)
    const limitInt = parseInt(limit, 10)
    const startIndex = (pageInt - 1) * limitInt
    const endIndex = pageInt * limitInt

    const paginatedReviews = sortedReviews.slice(startIndex, endIndex)

    res.status(200).json({
      reviews: paginatedReviews,
      totalReviews: product.reviews.length,
      totalPages: Math.ceil(product.reviews.length / limitInt),
      currentPage: pageInt,
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
