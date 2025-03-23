const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const productRoutes = require('./routes/productRoutes')
const cartRoutes = require('./routes/cartRoutes')
const checkoutRoutes = require('./routes/checkoutRoutes')
const orderRoutes = require('./routes/orderRoutes')
const uploadRoutes = require('./routes/uploadRoutes')
const subscriberRoutes = require('./routes/subscriberRoutes')
const adminRoutes = require('./routes/adminRoutes')
const productAdminRoutes = require('./routes/productAdminRoutes')
const adminOrderRoutes = require('./routes/adminOrderRoutes')
const collectionsRoutes = require('./routes/collectionsRoutes'); // Import collectionsRoutes




// Load environment variables
dotenv.config()

// Initialize Express app
const app = express()

// Middleware
app.use(cors()) // Enable CORS
app.use(express.json()) // Parse JSON bodies

// Connect to MongoDB
connectDB()

// Basic route for health check
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Server is running' })
})

// API Routes
app.use('/api/users', userRoutes)
app.use('/api/products', productRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/checkout', checkoutRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api', subscriberRoutes) // Mount subscriberRoutes at /api
app.use('/api/admin', adminRoutes) // Mount adminRoutes at /api/admin
app.use('/api/admin', productAdminRoutes) // Mount productAdminRoutes at /api/admin
app.use('/api/admin/orders', adminOrderRoutes) // Mount adminOrderRoutes at /api/admin/orders
app.use('/api/collections', collectionsRoutes); // Mount collectionsRoutes at /api/collections

// Error handling middleware (must be after all routes)
app.use((err, req, res, next) => {
  console.error(`Error: ${err.message}`)
  res.status(500).json({ error: 'Internal Server Error' })
})

// Start the server
const PORT = process.env.PORT || 5000
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

// Graceful shutdown (handle SIGTERM and SIGINT signals)
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...')
  server.close(() => {
    console.log('Server closed.')
    process.exit(0)
  })
})

process.on('SIGINT', () => {
  console.log('SIGINT received. Shutting down gracefully...')
  server.close(() => {
    console.log('Server closed.')
    process.exit(0)
  })
})
