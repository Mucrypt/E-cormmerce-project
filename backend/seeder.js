const mongoose = require('mongoose')
const dotenv = require('dotenv')
const bcrypt = require('bcryptjs')
const Product = require('./models/Product')
const Category = require('./models/Category')
const Cart = require('./models/Cart')
const User = require('./models/Users')
const products = require('./data/products')
const categories = require('./data/categories')



dotenv.config()

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB Connection Error:', err))

// Function to import seed data
const seedData = async () => {
  try {
    // Clear existing data
    await Product.deleteMany()
    await Category.deleteMany()
    await User.deleteMany()
    await Cart.deleteMany()

    // Hash the password manually (optional, since the pre-save hook handles it)
    const hashedPassword = await bcrypt.hash('Yaah3813@@', 10)

    // Create a default admin user to seed the database
    const createdUser = await User.create({
      name: 'Admin User',
      email: 'romeomukulah@gmail.com',
      password: hashedPassword,
      role: 'admin',
    })

    console.log('Created User:', createdUser) // Debugging line

    // Assign the default admin user ID to each product
    const userID = createdUser._id // Access _id directly from the createdUser object

    // Seed categories first
    const createdCategories = await Category.insertMany(categories)

    // Map category names to their ObjectIds for easy lookup
    const categoryMap = createdCategories.reduce((map, category) => {
      map[category.name] = category._id
      return map
    }, {})

    // Add the user ID and category ObjectId to each product
    const productsData = products.map((product) => {
      return {
        ...product,
        user: userID,
        category: categoryMap[product.category], // Replace category name with ObjectId
      }
    })

    // Insert the products into the database
    await Product.insertMany(productsData)
    console.log('Data Imported Successfully!')
    process.exit()
  } catch (error) {
    console.error('Error importing data:', error)
    process.exit(1)
  }
}

seedData()
