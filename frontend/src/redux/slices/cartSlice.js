import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// Helper function to load cart from local storage
const loadCartFromStorage = () => {
  const storedCart = localStorage.getItem('cart')
  return storedCart ? JSON.parse(storedCart) : { products: [] }
}

// Helper function to save cart to local storage
const saveCartToStorage = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart))
}

// Fetch cart for a user or guest
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async ({ userId, guestId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
        {
          params: { userId, guestId },
        }
      )
      return response.data
    } catch (err) {
      console.error(err)
      return rejectWithValue(err.response?.data || 'Failed to fetch cart')
    }
  }
)

// Add an item to the cart for a user or guest
export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (
    { userId, guestId, productId, quantity, size, color },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
        {
          userId,
          guestId,
          productId,
          quantity,
          size,
          color,
        }
      )
      return response.data
    } catch (err) {
      console.error(err)
      return rejectWithValue(err.response?.data || 'Failed to add item to cart')
    }
  }
)

// Update the quantity of an item in the cart
export const updateCartItemQuantity = createAsyncThunk(
  'cart/updateCartItemQuantity',
  async (
    { userId, guestId, productId, quantity, size, color },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
        {
          userId,
          guestId,
          productId,
          quantity,
          size,
          color,
        }
      )
      return response.data
    } catch (err) {
      console.error(err)
      return rejectWithValue(
        err.response?.data || 'Failed to update item quantity'
      )
    }
  }
)

// Remove an item from the cart
export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async ({ userId, guestId, productId, size, color }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
        {
          data: { userId, guestId, productId, size, color },
        }
      )
      return response.data
    } catch (err) {
      console.error(err)
      return rejectWithValue(
        err.response?.data || 'Failed to remove item from cart'
      )
    }
  }
)

// Merge guest cart into user cart
export const mergeCart = createAsyncThunk(
  'cart/mergeCart',
  async ({ guestId }, { getState, rejectWithValue }) => {
    try {
      // Get token from auth state or localStorage
      const token =
        getState().auth.user?.token || localStorage.getItem('userToken')

      if (!token) {
        throw new Error('No authentication token found')
      }

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart/merge`,
        { guestId },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )

      // Debug logging
      console.log('Merge cart response:', response.data)

      return response.data.cart
    } catch (error) {
      // Enhanced error logging
      console.error('Merge cart failed:', {
        message: error.message,
        response: error.response?.data,
        config: error.config,
      })

      return rejectWithValue(
        error.response?.data || { message: 'Failed to merge carts' }
      )
    }
  }
)


// Initial state for the cart slice
const initialState = {
  cart: loadCartFromStorage(),
  loading: false,
  error: null,
}

// Create the cart slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Clear the cart state
    clearCart: (state) => {
      state.cart = { products: [] }
      localStorage.removeItem('cart')
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false
        state.cart = action.payload || { products: [] }
        saveCartToStorage(action.payload)
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload?.message || 'Failed to fetch cart'
      })

      // Add to Cart
      .addCase(addToCart.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false
        state.cart = action.payload || { products: [] }
        saveCartToStorage(action.payload)
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload?.message || 'Failed to add item to cart'
      })

      // Update Cart Item Quantity
      .addCase(updateCartItemQuantity.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        state.loading = false
        state.cart = action.payload || { products: [] }
        saveCartToStorage(action.payload)
      })
      .addCase(updateCartItemQuantity.rejected, (state, action) => {
        state.loading = false
        state.error =
          action.payload?.message || 'Failed to update item quantity'
      })

      // Remove from Cart
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false
        state.cart = action.payload || { products: [] }
        saveCartToStorage(action.payload)
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false
        state.error =
          action.payload?.message || 'Failed to remove item from cart'
      })

      // Merge Cart
      .addCase(mergeCart.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(mergeCart.fulfilled, (state, action) => {
        state.loading = false
        state.cart = action.payload || { products: [] }
        saveCartToStorage(action.payload)
      })
      .addCase(mergeCart.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload?.message || 'Failed to merge carts'
      })
  },
})

// Export actions and reducer
export const { clearCart } = cartSlice.actions
export default cartSlice.reducer


/*
    The  cartSlice.js  file defines the cart slice, which contains the cart state, actions, and reducers. The slice uses the  createSlice  function from Redux Toolkit to define the slice. 
    The slice includes the following actions: 
    
    fetchCart : Fetches the cart for a user or guest. 
    addToCart : Adds an item to the cart for a user or guest. 
    updateCartItemQuantity : Updates the quantity of an item in the cart. 
    removeFromCart : Removes an item from the cart. 
    mergeCart : Merges a guest cart into a user cart. 
    clearCart : Clears the cart state. 
    
    The slice also includes a  loadCartFromStorage  function to load the cart from local storage and a  saveCartToStorage  function to save the cart to local storage. 
    The slice defines the initial state for the cart slice and the cart reducer. The reducer handles the actions defined in the slice and updates the cart state accordingly. 
    Step 4: Create the Redux Store 
    Next, create the Redux store to manage the application state. The store will include the cart slice created in the previous step. 
    Create a new file named  store.js  in the  frontend/src/redux  directory and add the following code: 
     File: frontend/src/redux/store.js

    */
