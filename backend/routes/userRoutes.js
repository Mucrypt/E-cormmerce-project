const express = require('express')
const User = require('../models/Users')
const jwt = require('jsonwebtoken')

const router = express.Router()

// Middleware to verify JWT token
const authMiddleware = async (req, res, next) => {
  try {
    // Get the token from the Authorization header
    const token = req.header('Authorization')?.replace('Bearer ', '')

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided. Access denied.',
      })
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Find the user by the decoded ID
    const user = await User.findById(decoded.id).select('-password') // Exclude the password field
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      })
    }

    // Attach the user to the request object
    req.user = user
    next()
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid or expired token.',
      error: error.message,
    })
  }
}

//@route POST /api/users/register
//@desc Register a new user and return a JWT token
//@access Public
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body

  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists',
      })
    }

    // Create a new user if the email is unique
    const user = await User.create({
      name,
      email,
      password, // Password will be hashed automatically by the pre-save hook in the User model
    })

    // Generate a JWT token for the newly registered user
    const token = jwt.sign(
      { id: user._id, role: user.role }, // Payload
      process.env.JWT_SECRET, // Secret key
      { expiresIn: '1h' } // Token expires in 1 hour
    )

    // Respond with the created user (excluding the password for security)
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      token, // Include the token in the response
      data: userResponse, // Include the user data in the response
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    })
  }
})

//@route POST /api/users/login
//@desc Login a user and return a JWT token
//@access Public
router.post('/login', async (req, res) => {
  const { email, password } = req.body

  try {
    // Check if the user exists
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email or password',
      })
    }

    // Check if the password is correct
    const isMatch = await user.matchPasswords(password)
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email or password',
      })
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // Token expires in 1 hour
    )

    // Respond with the token and user details (excluding the password)
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    }

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token, // Include the token in the response
      user: userResponse, // Include the user data in the response
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    })
  }
})

//@route GET /api/users/profile
//@desc Get user profile details (protected route)
//@access Private
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    // The user is already attached to the request object by the authMiddleware
    const user = req.user

    // Respond with the user's profile data (excluding the password)
    res.status(200).json({
      success: true,
      message: 'Profile retrieved successfully',
      data: user,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    })
  }
})

module.exports = router
