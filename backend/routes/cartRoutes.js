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
// In your addToCart backend route
router.post('/', async (req, res) => {
  const { productId, quantity, size, color, userId, guestId } = req.body;

  try {
    // Validate product exists
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    // Find or create cart
    let cart = await Cart.findOne({
      $or: [{ user: userId }, { guestId }]
    }).populate('products.productId');

    if (!cart) {
      cart = new Cart({
        user: userId || undefined,
        guestId: userId ? undefined : guestId,
        products: []
      });
    }

    // Add/update product in cart
    const itemIndex = cart.products.findIndex(item => 
      item.productId._id.equals(productId) &&
      item.size === size &&
      item.color === color
    );

    if (itemIndex > -1) {
      cart.products[itemIndex].quantity += quantity;
    } else {
      cart.products.push({
        productId: product._id,
        name: product.name,
        image: product.images[0]?.url,
        price: product.price,
        quantity,
        size,
        color
      });
    }

    // Calculate total
    cart.totalPrice = cart.products.reduce(
      (total, item) => total + (item.price * item.quantity),
      0
    );

    await cart.save();
    return res.status(200).json(cart);

  } catch (error) {
    console.error('Add to cart error:', error);
    return res.status(500).json({ message: 'Server Error' });
  }
});
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
  const userId = req.user._id

  try {
    // 1. Find guest cart with products
    const guestCart = await Cart.findOne({
      guestId,
      products: { $exists: true, $not: { $size: 0 } },
    }).populate('products.productId')

    // 2. Find or create user cart
    let userCart =
      (await Cart.findOne({ user: userId })) ||
      new Cart({ user: userId, products: [] })

    // 3. If guest cart exists with items, merge them
    if (guestCart) {
      console.log(`Merging ${guestCart.products.length} items from guest cart`)

      guestCart.products.forEach((guestItem) => {
        const existingItem = userCart.products.find(
          (item) =>
            item.productId.equals(guestItem.productId._id) &&
            item.size === guestItem.size &&
            item.color === guestItem.color
        )

        if (existingItem) {
          existingItem.quantity += guestItem.quantity
        } else {
          userCart.products.push({
            productId: guestItem.productId._id,
            name: guestItem.productId.name,
            image: guestItem.productId.images[0]?.url,
            price: guestItem.productId.price,
            quantity: guestItem.quantity,
            size: guestItem.size,
            color: guestItem.color,
          })
        }
      })

      // 4. Save merged cart and remove guest cart
      await userCart.save()
      await Cart.deleteOne({ _id: guestCart._id })

      return res.status(200).json({
        success: true,
        message: `Merged ${guestCart.products.length} items`,
        cart: userCart,
      })
    }

    // 5. If no guest cart with items, return current user cart
    return res.status(200).json({
      success: true,
      message:
        userCart.products.length > 0
          ? 'Using existing user cart'
          : 'No carts to merge',
      cart: userCart,
    })
  } catch (error) {
    console.error('Cart merge error:', error)
    return res.status(500).json({
      success: false,
      message: 'Failed to merge carts',
      error: error.message,
    })
  }
})
module.exports = router
