import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// Async thunk to fetch user's orders
export const fetchOrders = createAsyncThunk(
  'order/fetchOrders',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('userToken')
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/orders/my-orders`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      return response.data
    } catch (err) {
      console.error('Error fetching orders:', err)
      return rejectWithValue(err.response?.data || 'Failed to fetch orders')
    }
  }
)

// Async thunk to fetch order details by ID
export const fetchOrderDetails = createAsyncThunk(
  'order/fetchOrderDetails',
  async (orderId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('userToken')
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/orders/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      return response.data
    } catch (err) {
      console.error('Error fetching order details:', err)
      return rejectWithValue(
        err.response?.data || 'Failed to fetch order details'
      )
    }
  }
)

// Initial state for the order slice
const initialState = {
  orders: [],
  orderDetails: null,
  totalOrders: 0,
  loading: false,
  error: null,
}

// Create the order slice
const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    // Clear the order state
    clearOrders: (state) => {
      state.orders = []
      state.orderDetails = null
      state.totalOrders = 0
      state.loading = false
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Orders
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false
        state.orders = action.payload
        state.totalOrders = action.payload.length // Update totalOrders with the number of orders
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Failed to fetch orders'
      })

      // Fetch Order Details
      .addCase(fetchOrderDetails.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchOrderDetails.fulfilled, (state, action) => {
        state.loading = false
        state.orderDetails = action.payload
      })
      .addCase(fetchOrderDetails.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Failed to fetch order details'
      })
  },
})

// Export actions and reducer
export const { clearOrders } = orderSlice.actions
export default orderSlice.reducer

/*
    
    In the code above, we have defined two async thunks:  fetchOrders  and  fetchOrderDetails . The  fetchOrders  thunk fetches the user's orders, while the  fetchOrderDetails  thunk fetches the details of a specific order by ID. 
    We have also defined a  clearOrders  action to clear the order state. 
    Next, we need to create a new component to display the user's orders. 
    Create the Orders Component 
    Create a new component named  Orders.js  inside the  src/components  directory and add the following code:

    */
