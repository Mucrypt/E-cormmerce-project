const jwt = require('jsonwebtoken')
const User = require('../models/Users')
const createHttpError = require('http-errors')

// Configuration constants
const TOKEN_HEADER = 'Authorization'
const TOKEN_PREFIX = 'Bearer '
const TOKEN_EXPIRY = '1h'

/**
 * Enhanced authentication middleware with:
 * - Robust token validation
 * - Comprehensive error handling
 * - Detailed logging
 * - Security best practices
 */
// Updated authMiddleware in backend
const authMiddleware = async (req, res, next) => {
  try {
    // 1. Validate Authorization header exists
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: 'Authorization header is required'
      });
    }

    // 2. Verify Bearer token format
    if (!authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token format. Use Bearer token'
      });
    }

    // 3. Extract and validate token
    const token = authHeader.substring(7).trim();
    if (!token || token.split('.').length !== 3) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token structure'
      });
    }

    // 4. Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET, {
        algorithms: ['HS256'],
        ignoreExpiration: false
      });
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: err.name === 'TokenExpiredError' ? 
          'Token expired' : 'Invalid token',
        error: err.message
      });
    }

    // 5. Find user
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({
      success: false,
      message: 'Authentication failed'
    });
  }
};

/**
 * Role-based access control middleware
 * Supports multiple roles and hierarchical permissions
 */
const roleMiddleware = (requiredRoles = ['admin']) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        console.error('Role check failed - no user attached')
        return next(createHttpError.Unauthorized('Authentication required'))
      }

      if (!Array.isArray(requiredRoles)) {
        requiredRoles = [requiredRoles]
      }

      const hasRole = requiredRoles.some(
        (role) => req.user.role === role || req.user.role === 'superadmin'
      )

      if (!hasRole) {
        console.warn(`Unauthorized access attempt by ${req.user.email}`, {
          required: requiredRoles,
          actual: req.user.role,
          path: req.path,
        })
        return next(createHttpError.Forbidden('Insufficient privileges'))
      }

      console.debug(
        `Access granted to ${req.user.email} for ${requiredRoles.join(', ')}`
      )
      next()
    } catch (error) {
      console.error('Role verification error:', error)
      next(createHttpError.InternalServerError('Access verification failed'))
    }
  }
}

module.exports = {
  authMiddleware,
  roleMiddleware,
  adminMiddleware: roleMiddleware(['admin']), // Preset for admin-only
  superAdminMiddleware: roleMiddleware(['superadmin']), // Preset for superadmin
}
