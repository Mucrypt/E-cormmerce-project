const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const productRoutes = require('./routes/productRoutes')
const cartRoutes = require('./routes/cartRoutes')


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

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(`Error: ${err.message}`)
  res.status(500).json({ error: 'Internal Server Error' })
})

//Api Routes
app.use('/api/users', userRoutes)


//Product Category Routes
app.use('/api/products', productRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/cart', cartRoutes)

// Start the server
const PORT = process.env.PORT || 5000
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

// Graceful shutdown
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
