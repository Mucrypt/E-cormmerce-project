//backend/src/redux/slices/subscriberSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// Async thunk to subscribe to the newsletter
export const subscribeToNewsletter = createAsyncThunk(
  'subscriber/subscribeToNewsletter',
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/subscribe`,
        { email }
      )
      return response.data
    } catch (err) {
      console.error('Error subscribing to newsletter:', err)
      return rejectWithValue(err.response?.data || 'Failed to subscribe')
    }
  }
)

// Initial state for the subscriber slice
const initialState = {
  loading: false,
  error: null,
  successMessage: null,
}

// Create the subscriber slice
const subscriberSlice = createSlice({
  name: 'subscriber',
  initialState,
  reducers: {
    // Clear the subscriber state
    clearSubscriberState: (state) => {
      state.loading = false
      state.error = null
      state.successMessage = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Subscribe to Newsletter
      .addCase(subscribeToNewsletter.pending, (state) => {
        state.loading = true
        state.error = null
        state.successMessage = null
      })
      .addCase(subscribeToNewsletter.fulfilled, (state, action) => {
        state.loading = false
        state.successMessage = action.payload.msg
      })
      .addCase(subscribeToNewsletter.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload?.msg || 'Failed to subscribe'
      })
  },
})

// Export actions and reducer
export const { clearSubscriberState } = subscriberSlice.actions
export default subscriberSlice.reducer

