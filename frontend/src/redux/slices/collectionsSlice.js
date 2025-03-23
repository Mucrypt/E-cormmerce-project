import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// Async Thunks

// Fetch all collections
export const fetchCollections = createAsyncThunk(
  'collections/fetchCollections',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/collections`
      )
      console.log('Fetched Collections:', response.data) // Debug log
      return response.data
    } catch (error) {
      console.error(
        'Error fetching collections:',
        error.response?.data || error.message
      ) // Debug log
      return rejectWithValue(
        error.response?.data || { message: 'Failed to fetch collections' }
      )
    }
  }
)

// Fetch products by collection
export const fetchProductsByCollection = createAsyncThunk(
  'collections/fetchProductsByCollection',
  async (collection, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/collections/${collection}/products`
      )
      console.log('Fetched Products by Collection:', response.data) // Debug log
      return response.data
    } catch (error) {
      console.error(
        'Error fetching products by collection:',
        error.response?.data || error.message
      ) // Debug log
      return rejectWithValue(
        error.response?.data || {
          message: 'Failed to fetch products by collection',
        }
      )
    }
  }
)

// Fetch categories by collection
export const fetchCategoriesByCollection = createAsyncThunk(
  'collections/fetchCategoriesByCollection',
  async (collection, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/collections/${collection}/categories`
      )
      console.log('Fetched Categories by Collection:', response.data) // Debug log
      return response.data
    } catch (error) {
      console.error(
        'Error fetching categories by collection:',
        error.response?.data || error.message
      ) // Debug log
      return rejectWithValue(
        error.response?.data || {
          message: 'Failed to fetch categories by collection',
        }
      )
    }
  }
)

// Fetch collections for a specific category
export const fetchCollectionsByCategory = createAsyncThunk(
  'collections/fetchCollectionsByCategory',
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/categories/${categoryId}/collections`
      )
      console.log('Fetched Collections by Category:', response.data) // Debug log
      return response.data
    } catch (error) {
      console.error(
        'Error fetching collections by category:',
        error.response?.data || error.message
      ) // Debug log
      return rejectWithValue(
        error.response?.data || {
          message: 'Failed to fetch collections by category',
        }
      )
    }
  }
)

// Initial State
const initialState = {
  collections: [],
  productsByCollection: [],
  categoriesByCollection: [],
  loading: false,
  error: null,
}

// Slice
const collectionsSlice = createSlice({
  name: 'collections',
  initialState,
  reducers: {
    clearCollectionsState: (state) => {
      state.collections = []
      state.productsByCollection = []
      state.categoriesByCollection = []
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Collections
      .addCase(fetchCollections.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCollections.fulfilled, (state, action) => {
        state.loading = false
        state.collections = action.payload
      })
      .addCase(fetchCollections.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload?.message || 'Failed to fetch collections'
      })

      // Fetch Products by Collection
      .addCase(fetchProductsByCollection.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProductsByCollection.fulfilled, (state, action) => {
        state.loading = false
        state.productsByCollection = action.payload
      })
      .addCase(fetchProductsByCollection.rejected, (state, action) => {
        state.loading = false
        state.error =
          action.payload?.message || 'Failed to fetch products by collection'
      })

      // Fetch Categories by Collection
      .addCase(fetchCategoriesByCollection.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCategoriesByCollection.fulfilled, (state, action) => {
        state.loading = false
        state.categoriesByCollection = action.payload
      })
      .addCase(fetchCategoriesByCollection.rejected, (state, action) => {
        state.loading = false
        state.error =
          action.payload?.message || 'Failed to fetch categories by collection'
      })

      // Fetch Collections by Category
      .addCase(fetchCollectionsByCategory.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCollectionsByCategory.fulfilled, (state, action) => {
        state.loading = false
        state.collections = action.payload
      })
      .addCase(fetchCollectionsByCategory.rejected, (state, action) => {
        state.loading = false
        state.error =
          action.payload?.message || 'Failed to fetch collections by category'
      })
  },
})

export const { clearCollectionsState } = collectionsSlice.actions
export default collectionsSlice.reducer
