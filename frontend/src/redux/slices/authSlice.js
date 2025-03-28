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
// Updated loginUser thunk in authSlice.js
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/login`,
        userData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          validateStatus: (status) => status < 500 // Don't reject for 4xx errors
        }
      );

      // Handle non-2xx responses
      if (response.status >= 400) {
        return rejectWithValue({
          message: response.data?.message || 'Login failed',
          errors: response.data?.errors,
          status: response.status
        });
      }

      // Store token and user info
      localStorage.setItem('userInfo', JSON.stringify(response.data.user));
      localStorage.setItem('userToken', response.data.token);
      
      return response.data.user;
    } catch (error) {
      // Enhanced error handling
      if (error.response) {
        // The request was made and the server responded
        return rejectWithValue({
          message: error.response.data?.message || 'Login failed',
          errors: error.response.data?.errors,
          status: error.response.status
        });
      } else if (error.request) {
        // The request was made but no response received
        return rejectWithValue({
          message: 'Network error - no response from server',
          status: 0
        });
      } else {
        // Something happened in setting up the request
        return rejectWithValue({
          message: error.message || 'Login configuration error',
          status: -1
        });
      }
    }
  }
);
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

// Async thunk to update user profile
export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async ({ userId, updates }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('userToken');
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${userId}`,
        updates,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      // Update local storage with new user data
      localStorage.setItem('userInfo', JSON.stringify(response.data.user));
      
      return response.data.user;
    } catch (error) {
      console.error('Profile update error:', error.response?.data);
      return rejectWithValue(
        error.response?.data || { message: 'Failed to update profile' }
      );
    }
  }
);

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
      .addCase(updateProfile.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.error = null
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload?.message || 'Profile update failed'
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
