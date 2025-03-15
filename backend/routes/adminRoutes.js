const { Parser } = require('json2csv')
const express = require('express')
const User = require('../models/Users')
const {
  authMiddleware,
  adminMiddleware,
} = require('../middleware/authMiddleware')
const bcrypt = require('bcryptjs')

const router = express.Router()

// @route GET /api/admin/users
// @desc Get all users (admin only)
// @access Private/Admin
router.get('/users', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const users = await User.find({}).select('-password')
    res.json(users)
  } catch (error) {
    console.error('Error getting users', error)
    res.status(500).json({ message: 'Server Error' })
  }
})

// @route POST /api/admin/users
// @desc Create a new user (admin only)
// @access Private/Admin
router.post('/users', authMiddleware, adminMiddleware, async (req, res) => {
  const { name, email, password, role } = req.body

  // Validate input
  if (!name || !email || !password || !role) {
    return res
      .status(400)
      .json({ message: 'Please provide name, email, password, and role' })
  }

  // Check if role is valid
  if (!['customer', 'admin'].includes(role)) {
    return res.status(400).json({
      message: 'Invalid role. Role must be either "customer" or "admin"',
    })
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create the new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    })

    // Save the user to the database
    await newUser.save()
    console.log('New user saved:', newUser) // Log the saved user

    // Return the user (excluding the password)
    const userResponse = newUser.toObject()
    delete userResponse.password

    res
      .status(201)
      .json({ message: 'User created successfully', user: userResponse })
  } catch (error) {
    console.error('Error creating user:', error)
    res.status(500).json({ message: 'Server Error', error: error.message })
  }
})

// @route GET /api/admin/users/export
// @desc Export users to CSV (admin only)
// @access Private/Admin
router.get(
  '/users/export',
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const users = await User.find({}).select('-password')
      const fields = ['_id', 'name', 'email', 'role', 'createdAt']
      const json2csvParser = new Parser({ fields })
      const csv = json2csvParser.parse(users)

      res.header('Content-Type', 'text/csv')
      res.attachment('users.csv')
      res.send(csv)
    } catch (error) {
      console.error('Error exporting users:', error)
      res.status(500).json({ message: 'Server Error', error: error.message })
    }
  }
)

// @route GET /api/admin/users/stats
// @desc Get user statistics (admin only)
// @access Private/Admin
router.get(
  '/users/stats',
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const totalUsers = await User.countDocuments()
      const activeUsers = await User.countDocuments({ isActive: true })
      const admins = await User.countDocuments({ role: 'admin' })

      res.json({
        totalUsers,
        activeUsers,
        admins,
      })
    } catch (error) {
      console.error('Error getting user statistics:', error)
      res.status(500).json({ message: 'Server Error', error: error.message })
    }
  }
)

// @route PUT /api/admin/users/:id/status
// @desc Toggle user active status (admin only)
// @access Private/Admin
router.put(
  '/users/:id/status',
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const user = await User.findById(req.params.id)
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }

      // Toggle the user's active status
      user.isActive = !user.isActive
      await user.save()

      res.json({
        message: `User ${
          user.isActive ? 'activated' : 'deactivated'
        } successfully`,
        user,
      })
    } catch (error) {
      console.error('Error toggling user status:', error)
      res.status(500).json({ message: 'Server Error', error: error.message })
    }
  }
)

// @route PUT /api/admin/users/:id/role
// @desc Change a user's role (admin only)
// @access Private/Admin
router.put(
  '/users/:id/role',
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    const { role } = req.body

    // Validate role
    if (!['customer', 'admin'].includes(role)) {
      return res
        .status(400)
        .json({
          message: 'Invalid role. Role must be either "customer" or "admin"',
        })
    }

    try {
      const user = await User.findById(req.params.id)
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }

      // Update the user's role
      user.role = role
      await user.save()

      // Return the updated user (excluding the password)
      const userResponse = user.toObject()
      delete userResponse.password

      res.json({
        message: 'User role updated successfully',
        user: userResponse,
      })
    } catch (error) {
      console.error('Error updating user role:', error)
      res.status(500).json({ message: 'Server Error', error: error.message })
    }
  }
)

// @route GET /api/admin/users/paginate
// @desc Get paginated users (admin only)
// @access Private/Admin
router.get(
  '/users/paginate',
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    const { page = 1, limit = 10 } = req.query // Default: page 1, limit 10 users per page

    try {
      const users = await User.find({})
        .select('-password')
        .limit(limit * 1) // Convert limit to a number
        .skip((page - 1) * limit) // Calculate the number of documents to skip
        .exec()

      const count = await User.countDocuments() // Total number of users

      res.json({
        users,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      })
    } catch (error) {
      console.error('Error paginating users:', error)
      res.status(500).json({ message: 'Server Error', error: error.message })
    }
  }
)

// @route GET /api/admin/users/search
// @desc Search users by name, email, or role (admin only)
// @access Private/Admin
router.get(
  '/users/search',
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    const { query } = req.query

    try {
      const users = await User.find({
        $or: [
          { name: { $regex: query, $options: 'i' } }, // Case-insensitive search by name
          { email: { $regex: query, $options: 'i' } }, // Case-insensitive search by email
          { role: { $regex: query, $options: 'i' } }, // Case-insensitive search by role
        ],
      }).select('-password')

      res.json(users)
    } catch (error) {
      console.error('Error searching users:', error)
      res.status(500).json({ message: 'Server Error', error: error.message })
    }
  }
)

// @route DELETE /api/admin/users/:id
// @desc Delete a user (admin only)
// @access Private/Admin
router.delete(
  '/users/:id',
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id) // Use findByIdAndDelete()
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }

      res.json({ message: 'User deleted successfully' })
    } catch (error) {
      console.error('Error deleting user:', error)
      res.status(500).json({ message: 'Server Error', error: error.message })
    }
  }
)

// @route PUT /api/admin/users/:id
// @desc Update a user (admin only)
// @access Private/Admin
router.put('/users/:id', authMiddleware, adminMiddleware, async (req, res) => {
  const { name, email, role } = req.body

  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Update user fields
    user.name = name || user.name
    user.email = email || user.email
    user.role = role || user.role

    // Save the updated user
    await user.save()

    // Return the updated user (excluding the password)
    const userResponse = user.toObject()
    delete userResponse.password

    res.json({ message: 'User updated successfully', user: userResponse })
  } catch (error) {
    console.error('Error updating user:', error)
    res.status(500).json({ message: 'Server Error', error: error.message })
  }
})

// @route GET /api/admin/users/:id
// @desc Get a single user by ID (admin only)
// @access Private/Admin
router.get('/users/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password')
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.json(user)
  } catch (error) {
    console.error('Error getting user:', error)
    res.status(500).json({ message: 'Server Error', error: error.message })
  }
})

module.exports = router
