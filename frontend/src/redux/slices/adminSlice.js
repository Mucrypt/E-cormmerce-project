//backend/src/redux/slices/adminSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// Async thunk to fetch all users (admin only)
export const fetchUsers = createAsyncThunk(
  'admin/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('userToken')
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/users`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      return response.data
    } catch (err) {
      console.error('Error fetching users:', err)
      return rejectWithValue(err.response?.data || 'Failed to fetch users')
    }
  }
)

// Async thunk to create a new user (admin only)
export const createUser = createAsyncThunk(
  'admin/createUser',
  async ({ name, email, password, role }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('userToken')
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/users`,
        { name, email, password, role },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      return response.data
    } catch (err) {
      console.error('Error creating user:', err)
      return rejectWithValue(err.response?.data || 'Failed to create user')
    }
  }
)

// Async thunk to update a user (admin only)
export const updateUser = createAsyncThunk(
  'admin/updateUser',
  async ({ userId, name, email, role }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('userToken')
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${userId}`,
        { name, email, role },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      return response.data
    } catch (err) {
      console.error('Error updating user:', err)
      return rejectWithValue(err.response?.data || 'Failed to update user')
    }
  }
)

// Async thunk to delete a user (admin only)
export const deleteUser = createAsyncThunk(
  'admin/deleteUser',
  async (userId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('userToken')
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      return response.data
    } catch (err) {
      console.error('Error deleting user:', err)
      return rejectWithValue(err.response?.data || 'Failed to delete user')
    }
  }
)

// Async thunk to toggle user active status (admin only)
export const toggleUserStatus = createAsyncThunk(
  'admin/toggleUserStatus',
  async (userId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('userToken')
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${userId}/status`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      return response.data
    } catch (err) {
      console.error('Error toggling user status:', err)
      return rejectWithValue(
        err.response?.data || 'Failed to toggle user status'
      )
    }
  }
)

// Async thunk to change user role (admin only)
export const changeUserRole = createAsyncThunk(
  'admin/changeUserRole',
  async ({ userId, role }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('userToken')
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${userId}/role`,
        { role },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      return response.data
    } catch (err) {
      console.error('Error changing user role:', err)
      return rejectWithValue(err.response?.data || 'Failed to change user role')
    }
  }
)

// Async thunk to fetch user statistics (admin only)
export const fetchUserStats = createAsyncThunk(
  'admin/fetchUserStats',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('userToken')
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/users/stats`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      return response.data
    } catch (err) {
      console.error('Error fetching user stats:', err)
      return rejectWithValue(err.response?.data || 'Failed to fetch user stats')
    }
  }
)

// Initial state for the admin slice
const initialState = {
  users: [],
  userStats: null,
  loading: false,
  error: null,
}

// Create the admin slice
const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    // Clear the admin state
    clearAdminState: (state) => {
      state.users = []
      state.userStats = null
      state.loading = false
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false
        state.users = action.payload
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Failed to fetch users'
      })

      // Create User
      .addCase(createUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false
        state.users.push(action.payload.user)
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Failed to create user'
      })

      // Update User
      .addCase(updateUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false
        const updatedUser = action.payload.user
        state.users = state.users.map((user) =>
          user._id === updatedUser._id ? updatedUser : user
        )
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Failed to update user'
      })

      // Delete User
      .addCase(deleteUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false
        state.users = state.users.filter(
          (user) => user._id !== action.payload.userId
        )
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Failed to delete user'
      })

      // Toggle User Status
      .addCase(toggleUserStatus.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(toggleUserStatus.fulfilled, (state, action) => {
        state.loading = false
        const updatedUser = action.payload.user
        state.users = state.users.map((user) =>
          user._id === updatedUser._id ? updatedUser : user
        )
      })
      .addCase(toggleUserStatus.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Failed to toggle user status'
      })

      // Change User Role
      .addCase(changeUserRole.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(changeUserRole.fulfilled, (state, action) => {
        state.loading = false
        const updatedUser = action.payload.user
        state.users = state.users.map((user) =>
          user._id === updatedUser._id ? updatedUser : user
        )
      })
      .addCase(changeUserRole.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Failed to change user role'
      })

      // Fetch User Stats
      .addCase(fetchUserStats.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUserStats.fulfilled, (state, action) => {
        state.loading = false
        state.userStats = action.payload
      })
      .addCase(fetchUserStats.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Failed to fetch user stats'
      })
  },
})

// Export actions and reducer
export const { clearAdminState } = adminSlice.actions
export default adminSlice.reducer