import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// Retrieve user information from local storage if it exists
const userFromStorage = () => {
  const userInfo = localStorage.getItem('userInfo')
  if (!userInfo || userInfo === 'undefined') {
    return null // Return null if userInfo is undefined or not present
  }
  try {
    return JSON.parse(userInfo) // Parse only if userInfo is valid JSON
  } catch (error) {
    console.error('Failed to parse userInfo from localStorage:', error)
    return null // Fallback to null if parsing fails
  }
}

// Check for an existing guest ID in the localStorage or generate a new one
const initialGuestId =
  localStorage.getItem('guestId') || `guest_${new Date().getTime()}`
localStorage.setItem('guestId', initialGuestId)

// Initial state of the auth slice
const initialState = {
  user: userFromStorage(), // Call the function to get user info
  guestId: initialGuestId,
  loading: false,
  error: null,
}

// Async thunk to log in a user
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/login`,
        userData
      )
      localStorage.setItem('userInfo', JSON.stringify(response.data.user))
      localStorage.setItem('userToken', response.data.token)
      return response.data.user // Return the user data
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: 'Login failed' }
      )
    }
  }
)

// Async thunk to register a user
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/register`,
        userData
      )
      localStorage.setItem('userInfo', JSON.stringify(response.data.user))
      localStorage.setItem('userToken', response.data.token)
      return response.data.user // Return the user data
    } catch (error) {
      console.error('Registration error:', error.response?.data) // Log the error
      return rejectWithValue(
        error.response?.data || { message: 'Registration failed' }
      )
    }
  }
)

// Create the auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.guestId = `guest_${new Date().getTime()}`
      localStorage.removeItem('userInfo')
      localStorage.removeItem('userToken')
      localStorage.setItem('guestId', state.guestId) // Set the guest ID in local storage
    },
    generateNewGuestId: (state) => {
      state.guestId = `guest_${new Date().getTime()}`
      localStorage.setItem('guestId', state.guestId) // Set the guest ID in local storage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.error = null
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload?.message || 'Login failed'
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.error = null
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload?.message || 'Registration failed'
      })
  },
})

export const { logout, generateNewGuestId } = authSlice.actions
export default authSlice.reducer
/*
    The auth slice contains the initial state, two async thunks for logging in and registering a user, and two reducers for logging out and generating a new guest ID. 
    The  loginUser  and  registerUser  async thunks are used to log in and register a user, respectively. The  loginUser  async thunk sends a POST request to the  /api/users/login  endpoint with the user data, while the  registerUser  async thunk sends a POST request to the  /api/users/register  endpoint with the user data. 
    The  logout  reducer is used to log out a user by setting the user to  null  and generating a new guest ID. The  generateNewGuestId  reducer is used to generate a new guest ID. 
    Step 4: Create the Redux Slice for the Cart 
    Next, we'll create a Redux slice for managing the cart state. 
    Create a new file named  cartSlice.js  in the  frontend/src/redux/slices  directory and add the following code:
*/
