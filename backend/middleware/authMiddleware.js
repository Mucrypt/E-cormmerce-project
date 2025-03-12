const jwt = require('jsonwebtoken')
const User = require('../models/Users')

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

// Middleware to check if the user is an admin
const adminMiddleware = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next() // User is an admin, proceed to the next middleware/route
  } else {
    res.status(403).json({
      success: false,
      message: 'Access denied. You are not authorized to perform this action.',
    })
  }
}

module.exports = { authMiddleware, adminMiddleware }
