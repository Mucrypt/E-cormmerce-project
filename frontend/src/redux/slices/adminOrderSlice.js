import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// Async thunk to fetch all orders (admin only)
export const fetchAllOrders = createAsyncThunk(
  'adminOrders/fetchAllOrders',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('userToken')
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders`,
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

// Async thunk to mark an order as delivered (admin only)
export const markOrderAsDelivered = createAsyncThunk(
  'adminOrders/markOrderAsDelivered',
  async (orderId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('userToken')
      const response = await axios.put(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/admin/orders/${orderId}/deliver`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      return response.data
    } catch (err) {
      console.error('Error marking order as delivered:', err)
      return rejectWithValue(
        err.response?.data || 'Failed to mark order as delivered'
      )
    }
  }
)

// Async thunk to fetch total sales (admin only)
export const fetchTotalSales = createAsyncThunk(
  'adminOrders/fetchTotalSales',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('userToken');
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/total-sales`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.totalSales;
    } catch (err) {
      console.error('Error fetching total sales:', err);
      return rejectWithValue(err.response?.data || 'Failed to fetch total sales');
    }
  }
);

// Async thunk to cancel an order (admin only)
export const cancelOrder = createAsyncThunk(
  'adminOrders/cancelOrder',
  async (orderId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('userToken')
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      return response.data
    } catch (err) {
      console.error('Error canceling order:', err)
      return rejectWithValue(err.response?.data || 'Failed to cancel order')
    }
  }
)

// Initial state for the admin orders slice
const initialState = {
  orders: [],
  totalSales: 0, // Add totalSales to the state
  loading: false,
  error: null,
};

// Create the admin orders slice
const adminOrderSlice = createSlice({
  name: 'adminOrders',
  initialState,
  reducers: {
    // Clear the admin orders state
    clearAdminOrders: (state) => {
      state.orders = [];
      state.totalSales = 0;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Admin Orders
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch orders';
      })

      // Fetch Total Sales
      .addCase(fetchTotalSales.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTotalSales.fulfilled, (state, action) => {
        state.loading = false;
        state.totalSales = action.payload;
      })
      .addCase(fetchTotalSales.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch total sales';
      })

      // Mark Order as Delivered
      .addCase(markOrderAsDelivered.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(markOrderAsDelivered.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = state.orders.map((order) =>
          order._id === action.payload.order._id ? action.payload.order : order
        );
      })
      .addCase(markOrderAsDelivered.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to mark order as delivered';
      })

      // Cancel Order
      .addCase(cancelOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = state.orders.filter(
          (order) => order._id !== action.payload.orderId
        );
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to cancel order';
      });
  },
});

// Export actions and reducer
export const { clearAdminOrders } = adminOrderSlice.actions;
export default adminOrderSlice.reducer;
