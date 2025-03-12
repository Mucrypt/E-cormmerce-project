const mongoose = require('mongoose')

const connectDB = async () => {
  const MONGODB_URI = process.env.MONGODB_URI

  if (!MONGODB_URI) {
    console.error(
      'MongoDB connection string is missing in environment variables.'
    )
    process.exit(1)
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
      connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    })

    console.log('MongoDB Connected Successfully')
  } catch (error) {
    console.error(`MongoDB connection FAIL: ${error.message}`)
    process.exit(1) // Exit the process with failure
  }
}

// Handle MongoDB connection events
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to DB')
})

mongoose.connection.on('error', (err) => {
  console.error(`Mongoose connection error: ${err.message}`)
})

mongoose.connection.on('disconnected', () => {
  console.warn('Mongoose disconnected from DB')
})

// Gracefully close the connection on process termination
process.on('SIGINT', async () => {
  await mongoose.connection.close()
  console.log('Mongoose connection closed due to app termination')
  process.exit(0)
})

module.exports = connectDB
