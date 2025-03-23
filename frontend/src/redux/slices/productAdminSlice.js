import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// Async thunk to fetch all products (admin only)
export const fetchAdminProducts = createAsyncThunk(
  'admin/fetchAdminProducts',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('userToken')
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/products`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      return response.data
    } catch (err) {
      console.error('Error fetching products:', err)
      return rejectWithValue(err.response?.data || 'Failed to fetch products')
    }
  }
)

// Async thunk to create a product (admin only)
export const createProduct = createAsyncThunk(
  'admin/createProduct',
  async (productData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('userToken')
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/products`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      return response.data
    } catch (err) {
      console.error('Error creating product:', err)
      return rejectWithValue(err.response?.data || 'Failed to create product')
    }
  }
)

// Async thunk to update a product (admin only)
export const updateProduct = createAsyncThunk(
  'admin/updateProduct',
  async ({ productId, productData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('userToken')
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/products/${productId}`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      return response.data
    } catch (err) {
      console.error('Error updating product:', err)
      return rejectWithValue(err.response?.data || 'Failed to update product')
    }
  }
)

// Async thunk to delete a product (admin only)
export const deleteProduct = createAsyncThunk(
  'admin/deleteProduct',
  async (productId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('userToken')
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/products/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      return response.data
    } catch (err) {
      console.error('Error deleting product:', err)
      return rejectWithValue(err.response?.data || 'Failed to delete product')
    }
  }
)

// Async thunk to fetch product statistics (admin only)
export const fetchProductStats = createAsyncThunk(
  'admin/fetchProductStats',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('userToken')
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/products/stats`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      return response.data
    } catch (err) {
      console.error('Error fetching product stats:', err)
      return rejectWithValue(
        err.response?.data || 'Failed to fetch product stats'
      )
    }
  }
)

// Async thunk to search products (admin only)
export const searchProducts = createAsyncThunk(
  'admin/searchProducts',
  async (query, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('userToken')
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/products/search`,
        {
          params: { query },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      return response.data
    } catch (err) {
      console.error('Error searching products:', err)
      return rejectWithValue(err.response?.data || 'Failed to search products')
    }
  }
)

// Initial state for the product admin slice
const initialState = {
  products: [],
  productStats: null,
  searchResults: [],
  loading: false,
  error: null,
}

// Create the product admin slice
const productAdminSlice = createSlice({
  name: 'productAdmin',
  initialState,
  reducers: {
    // Clear the product admin state
    clearAdminProducts: (state) => {
      state.products = []
      state.productStats = null
      state.searchResults = []
      state.loading = false
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Admin Products
      .addCase(fetchAdminProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAdminProducts.fulfilled, (state, action) => {
        state.loading = false
        state.products = action.payload
      })
      .addCase(fetchAdminProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Failed to fetch products'
      })

      // Create Product
      .addCase(createProduct.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false
        state.products.push(action.payload)
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Failed to create product'
      })

      // Update Product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false
        const updatedProduct = action.payload
        state.products = state.products.map((product) =>
          product._id === updatedProduct._id ? updatedProduct : product
        )
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Failed to update product'
      })

      // Delete Product
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false
        state.products = state.products.filter(
          (product) => product._id !== action.payload.productId
        )
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Failed to delete product'
      })

      // Fetch Product Stats
      .addCase(fetchProductStats.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProductStats.fulfilled, (state, action) => {
        state.loading = false
        state.productStats = action.payload
      })
      .addCase(fetchProductStats.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Failed to fetch product stats'
      })

      // Search Products
      .addCase(searchProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.loading = false
        state.searchResults = action.payload
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Failed to search products'
      })
  },
})

// Export actions and reducer
export const { clearAdminProducts } = productAdminSlice.actions
export default productAdminSlice.reducer
