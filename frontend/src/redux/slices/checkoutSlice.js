import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// Async thunk to create a checkout session
export const createCheckout = createAsyncThunk(
  'checkout/createCheckout',
  async (
    { checkoutItems, paymentMethod, shippingAddress, totalPrice },
    { rejectWithValue }
  ) => {
    try {
      const token = localStorage.getItem('userToken')
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout`,
        { checkoutItems, paymentMethod, shippingAddress, totalPrice },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      return response.data
    } catch (err) {
      console.error('Error creating checkout:', err)
      return rejectWithValue(err.response?.data || 'Failed to create checkout')
    }
  }
)

// Async thunk to update payment status
export const updatePaymentStatus = createAsyncThunk(
  'checkout/updatePaymentStatus',
  async (
    { checkoutId, paymentStatus, paymentDetails },
    { rejectWithValue }
  ) => {
    try {
      const token = localStorage.getItem('userToken')
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`,
        { paymentStatus, paymentDetails },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      return response.data
    } catch (err) {
      console.error('Error updating payment status:', err)
      return rejectWithValue(
        err.response?.data || 'Failed to update payment status'
      )
    }
  }
)

// Async thunk to finalize checkout and create an order
export const finalizeCheckout = createAsyncThunk(
  'checkout/finalizeCheckout',
  async (checkoutId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('userToken')
      const response = await axios.post(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/checkout/${checkoutId}/finalize`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      return response.data
    } catch (err) {
      console.error('Error finalizing checkout:', err)
      return rejectWithValue(
        err.response?.data || 'Failed to finalize checkout'
      )
    }
  }
)

// Initial state for the checkout slice
const initialState = {
  checkout: null,
  loading: false,
  error: null,
  isPaid: false,
  isFinalized: false,
}

// Create the checkout slice
const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    // Clear the checkout state
    clearCheckout: (state) => {
      state.checkout = null
      state.loading = false
      state.error = null
      state.isPaid = false
      state.isFinalized = false
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Checkout
      .addCase(createCheckout.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createCheckout.fulfilled, (state, action) => {
        state.loading = false
        state.checkout = action.payload
      })
      .addCase(createCheckout.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Failed to create checkout'
      })

      // Update Payment Status
      .addCase(updatePaymentStatus.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updatePaymentStatus.fulfilled, (state, action) => {
        state.loading = false
        state.checkout = action.payload
        state.isPaid = true
      })
      .addCase(updatePaymentStatus.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Failed to update payment status'
      })

      // Finalize Checkout
      .addCase(finalizeCheckout.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(finalizeCheckout.fulfilled, (state, action) => {
        state.loading = false
        state.checkout = action.payload
        state.isFinalized = true
      })
      .addCase(finalizeCheckout.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Failed to finalize checkout'
      })
  },
})

// Export actions and reducer
export const { clearCheckout } = checkoutSlice.actions
export default checkoutSlice.reducer


/*
  
  In the code above, we have defined three async thunks to create a checkout session, update the payment status, and finalize the checkout. We have also defined an initial state and a reducer for the checkout slice. 
  The  createCheckout  async thunk sends a POST request to the  /api/checkout  endpoint with the checkout items, payment method, shipping address, and total price. The  updatePaymentStatus  async thunk sends a PUT request to the  /api/checkout/:checkoutId/pay  endpoint with the payment status and payment details. The  finalizeCheckout  async thunk sends a POST request to the  /api/checkout/:checkoutId/finalize  endpoint to finalize the checkout and create an order. 
  The  checkoutSlice  reducer handles the loading state, error state, and checkout state. It also sets the  isPaid  and  isFinalized  flags based on the payment status and checkout status. 
  Now, let’s create a new slice for the orders. 
  Create a new slice for orders 
  Create a new slice for orders by creating a new file named  ordersSlice.js  inside the  src/redux/slices  directory and add the following code:

  */