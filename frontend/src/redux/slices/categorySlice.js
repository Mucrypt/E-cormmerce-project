import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// Async Thunks

// Fetch all categories
export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/categories`
      )
      console.log('Fetched Categories:', response.data) // Debug log
      return response.data
    } catch (error) {
      console.error(
        'Error fetching categories:',
        error.response?.data || error.message
      ) // Debug log
      return rejectWithValue(
        error.response?.data || { message: 'Failed to fetch categories' }
      )
    }
  }
)

// Fetch a single category by ID
export const fetchCategoryById = createAsyncThunk(
  'categories/fetchCategoryById',
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/categories/${categoryId}`
      )
      console.log('Fetched Category by ID:', response.data) // Debug log
      return response.data
    } catch (error) {
      console.error(
        'Error fetching category by ID:',
        error.response?.data || error.message
      ) // Debug log
      return rejectWithValue(
        error.response?.data || { message: 'Failed to fetch category' }
      )
    }
  }
)

// Create a category (Admin only)
export const createCategory = createAsyncThunk(
  'categories/createCategory',
  async (categoryData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/categories`,
        categoryData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        }
      )
      console.log('Created Category:', response.data) // Debug log
      return response.data
    } catch (error) {
      console.error(
        'Error creating category:',
        error.response?.data || error.message
      ) // Debug log
      return rejectWithValue(
        error.response?.data || { message: 'Failed to create category' }
      )
    }
  }
)

// Update a category by ID (Admin only)
export const updateCategory = createAsyncThunk(
  'categories/updateCategory',
  async ({ categoryId, categoryData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/categories/${categoryId}`,
        categoryData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        }
      )
      console.log('Updated Category:', response.data) // Debug log
      return response.data
    } catch (error) {
      console.error(
        'Error updating category:',
        error.response?.data || error.message
      ) // Debug log
      return rejectWithValue(
        error.response?.data || { message: 'Failed to update category' }
      )
    }
  }
)

// Delete a category by ID (Admin only)
export const deleteCategory = createAsyncThunk(
  'categories/deleteCategory',
  async (categoryId, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/categories/${categoryId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        }
      )
      console.log('Deleted Category ID:', categoryId) // Debug log
      return categoryId
    } catch (error) {
      console.error(
        'Error deleting category:',
        error.response?.data || error.message
      ) // Debug log
      return rejectWithValue(
        error.response?.data || { message: 'Failed to delete category' }
      )
    }
  }
)

// Initial State
const initialState = {
  categories: [],
  category: null,
  loading: false,
  error: null,
}

// Slice
const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    clearCategoryState: (state) => {
      state.category = null
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false
        state.categories = action.payload
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload?.message || 'Failed to fetch categories'
      })

      // Fetch Category by ID
      .addCase(fetchCategoryById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.loading = false
        state.category = action.payload
      })
      .addCase(fetchCategoryById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload?.message || 'Failed to fetch category'
      })

      // Create Category
      .addCase(createCategory.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false
        state.categories.push(action.payload)
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload?.message || 'Failed to create category'
      })

      // Update Category
      .addCase(updateCategory.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false
        const updatedCategory = action.payload
        const index = state.categories.findIndex(
          (category) => category._id === updatedCategory._id
        )
        if (index !== -1) {
          state.categories[index] = updatedCategory
        }
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload?.message || 'Failed to update category'
      })

      // Delete Category
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false
        const deletedCategoryId = action.payload
        state.categories = state.categories.filter(
          (category) => category._id !== deletedCategoryId
        )
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload?.message || 'Failed to delete category'
      })
  },
})

export const { clearCategoryState } = categorySlice.actions
export default categorySlice.reducer
