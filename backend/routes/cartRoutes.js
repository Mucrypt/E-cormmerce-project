const express = require('express')
const Cart = require('../models/cart') // Change 'Cart' to 'cart'
const Product = require('../models/product') // Change 'Product' to 'product'
const { authMiddleware } = require('../middleware/authMiddleware')
const router = express.Router()

// ...existing code...

// Helper function to get a cart by user id or guest id
const getCart = async (userId, guestId) => {
  if (userId) {
    return await Cart.findOne({ user: userId })
  } else if (guestId) {
    return await Cart.findOne({ guestId })
  }
  return null
}

//@route POST /api/cart
//@desc Add a product to the cart for a guest user or logged in user
//@access Public
router.post('/', async (req, res) => {
  const { productId, quantity, size, color, userId, guestId } = req.body

  try {
    // Validate product
    const product = await Product.findById(productId)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    // Check if the product is in stock
    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Product is out of stock' })
    }

    // Get the cart for the user or guest
    let cart = await getCart(userId, guestId)

    if (cart) {
      // Check if the product already exists in the cart
      const productIndex = cart.products.findIndex(
        (p) =>
          p.productId.toString() === productId &&
          p.size === size &&
          p.color === color
      )

      if (productIndex > -1) {
        // Update the quantity if the product already exists
        cart.products[productIndex].quantity += quantity
      } else {
        // Add the product to the cart if it doesn't exist
        cart.products.push({
          productId,
          name: product.name,
          image: product.images[0].url,
          price: product.price,
          quantity,
          size,
          color,
        })
      }
    } else {
      // Create a new cart if it doesn't exist
      cart = new Cart({
        user: userId || undefined,
        guestId: guestId || `guest_${Date.now()}`,
        products: [
          {
            productId,
            name: product.name,
            image: product.images[0].url,
            price: product.price,
            quantity,
            size,
            color,
          },
        ],
      })
    }

    // Save the cart
    await cart.save()
    res.status(201).json(cart)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error' })
  }
})

//@route PUT /api/cart
//@desc Update the quantity of a product in the cart for a guest or logged-in user
//@access Public
router.put('/', async (req, res) => {
  const { productId, quantity, userId, guestId, size, color } = req.body

  try {
    // Validate product
    const product = await Product.findById(productId)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    // Check if the product is in stock
    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Product is out of stock' })
    }

    // Get the cart for the user or guest
    let cart = await getCart(userId, guestId)
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' })
    }

    // Find the product in the cart
    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.size === size &&
        p.color === color
    )

    // Check if the product exists in the cart
    if (productIndex > -1) {
      if (quantity === 0) {
        // Remove the product if the quantity is 0
        cart.products.splice(productIndex, 1)
      } else {
        // Update the quantity
        cart.products[productIndex].quantity = quantity
      }
    } else {
      // If the product is not in the cart and quantity is not 0, add it
      if (quantity > 0) {
        cart.products.push({
          productId,
          name: product.name,
          image: product.images[0].url,
          price: product.price,
          quantity,
          size,
          color,
        })
      } else {
        return res.status(400).json({ message: 'Product not found in cart' })
      }
    }

    // Recalculate the total price
    cart.totalPrice = cart.products.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    )

    // Save the updated cart
    await cart.save()

    res.status(200).json(cart)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error' })
  }
})
//@route DELETE /api/cart
//@desc Remove a product from the cart for a guest or logged-in user
//@access Public
router.delete('/', async (req, res) => {
  const { productId, userId, guestId, size, color } = req.body

  try {
    // Get the cart for the user or guest
    let cart = await getCart(userId, guestId)
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' })
    }

    // Find the index of the product to remove
    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.size === size &&
        p.color === color
    )

    // If the product is found, remove it from the cart
    if (productIndex > -1) {
      cart.products.splice(productIndex, 1) // Remove the product
    } else {
      return res.status(404).json({ message: 'Product not found in cart' })
    }

    // Recalculate the total price
    cart.totalPrice = cart.products.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    )

    // Save the updated cart
    await cart.save()

    res.status(200).json(cart)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error' })
  }
})

//@route GET /api/cart
//@desc Get the cart for a guest or logged-in user
//@access Public
router.get('/', async (req, res) => {
  const { userId, guestId } = req.query // Use query parameters for userId and guestId

  try {
    // Get the cart for the user or guest
    let cart = await getCart(userId, guestId)

    if (!cart) {
      // If the cart doesn't exist, return an empty cart or a 404 response
      return res.status(404).json({ message: 'Cart not found' })
    }

    // Return the cart
    res.status(200).json(cart)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error' })
  }
})

//@route POST /api/cart/merge
//@desc Merge merge guest cart into user cart on login or signup
//@access Private
router.post('/merge', authMiddleware, async (req, res) => {
  const { guestId } = req.body

  try {
    //Find the guest cart and user cart
    const guestCart = await Cart.findOne({ guestId })
    const userCart = await Cart.findOne({ user: req.user._id })

    if (guestCart) {
      if (guestCart.products.length === 0) {
        return res.status(400).json({ message: 'Guest cart is empty' })
      }
      if (userCart) {
        // If the user has a cart, merge the guest cart products into the user cart
        guestCart.products.forEach(async (guestProduct) => {
          const productIndex = userCart.products.findIndex(
            (p) =>
              p.productId.toString() === guestProduct.productId.toString() &&
              p.size === guestProduct.size &&
              p.color === guestProduct.color
          )
          if (productIndex > -1) {
            // Update the quantity if the product already exists in the user cart
            userCart.products[productIndex].quantity += guestProduct.quantity
          } else {
            // Add the product to the user cart if it doesn't exist
            userCart.products.push(guestProduct)
          }
        })
        // Recalculate the total price
        userCart.totalPrice = userCart.products.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        )
        // Save the updated user cart
        await userCart.save()

        // Remove the guest cart after merging
        try {
          await Cart.findOneAndDelete({ guestId })
        } catch (error) {
          console.error(error, 'Error deleting guest cart')
        }
        res.status(200).json(userCart)
      } else {
        // If the user doesn't have a cart, update the guest cart with the user id
        guestCart.user = req.user._id
        guestCart.guestId = undefined
        await guestCart.save()
        res.status(200).json(guestCart)
      }
    } else {
      if (userCart) {
        // If the user has a cart, return the user cart
        res.status(200).json(userCart)
      }
      res.status(404).json({ message: 'Cart not found' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error' })
  }
})

module.exports = router
