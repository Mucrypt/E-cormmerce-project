import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async Thunks

// Fetch all products with pagination, filtering, and sorting
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (queryParams, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/products`,
        { params: queryParams }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: 'Failed to fetch products' }
      );
    }
  }
);

// Fetch a single product by ID
export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/${productId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: 'Failed to fetch product' }
      );
    }
  }
);

// Create a product (Admin only)
export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (productData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/products`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: 'Failed to create product' }
      );
    }
  }
);

// Update a product by ID (Admin only)
export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ productId, productData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/${productId}`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: 'Failed to update product' }
      );
    }
  }
);

// Delete a product by ID (Admin only)
export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (productId, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        }
      );
      return productId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: 'Failed to delete product' }
      );
    }
  }
);

// Add a review to a product (Authenticated users only)
export const addReview = createAsyncThunk(
  'products/addReview',
  async ({ productId, reviewData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/${productId}/reviews`,
        reviewData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: 'Failed to add review' }
      );
    }
  }
);

// Fetch product reviews with pagination
export const fetchProductReviews = createAsyncThunk(
  'products/fetchProductReviews',
  async ({ productId, queryParams }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/${productId}/reviews`,
        { params: queryParams }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: 'Failed to fetch reviews' }
      );
    }
  }
);

// Add a product to a collection (Admin only)
export const addToCollection = createAsyncThunk(
  'products/addToCollection',
  async ({ productId, collection }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/products/${productId}/collections/add`,
        { collection },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: 'Failed to add to collection' }
      );
    }
  }
);

// Remove a product from a collection (Admin only)
export const removeFromCollection = createAsyncThunk(
  'products/removeFromCollection',
  async ({ productId, collection }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/products/${productId}/collections/remove`,
        { collection },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: 'Failed to remove from collection' }
      );
    }
  }
);

// Fetch top-rated products
export const fetchTopRatedProducts = createAsyncThunk(
  'products/fetchTopRatedProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/top-rated`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: 'Failed to fetch top-rated products' }
      );
    }
  }
);

// Fetch featured products
export const fetchFeaturedProducts = createAsyncThunk(
  'products/fetchFeaturedProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/featured`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: 'Failed to fetch featured products' }
      );
    }
  }
);

// Fetch new arrivals
export const fetchNewArrivals = createAsyncThunk(
  'products/fetchNewArrivals',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: 'Failed to fetch new arrivals' }
      );
    }
  }
);

// Fetch best sellers
export const fetchBestSellers = createAsyncThunk(
  'products/fetchBestSellers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/best-sellers`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: 'Failed to fetch best sellers' }
      );
    }
  }
);

// Fetch product statistics (Admin only)
export const fetchProductStats = createAsyncThunk(
  'products/fetchProductStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/stats`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: 'Failed to fetch product statistics' }
      );
    }
  }
);

// Search products by name, description, or tags
export const searchProducts = createAsyncThunk(
  'products/searchProducts',
  async (query, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/search`,
        { params: { query } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: 'Failed to search products' }
      );
    }
  }
);

// Bulk update products (Admin only)
export const bulkUpdateProducts = createAsyncThunk(
  'products/bulkUpdateProducts',
  async ({ ids, updates }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/bulk-update`,
        { ids, updates },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: 'Failed to bulk update products' }
      );
    }
  }
);

// Fetch similar products
export const fetchSimilarProducts = createAsyncThunk(
  'products/fetchSimilarProducts',
  async ({ productId, limit = 5 }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/${productId}/similar`,
        {
          params: { limit },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: 'Failed to fetch similar products' }
      );
    }
  }
);

// Initial State
const initialState = {
  products: [],
  product: null,
  reviews: [],
  topRatedProducts: [],
  featuredProducts: [],
  newArrivals: [],
  bestSellers: [], // Ensure this property is defined
  productStats: null,
  searchResults: [],
  similarProducts: [],
  loading: false,
  error: null,
};

// Slice
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearProductState: (state) => {
      state.product = null;
      state.reviews = [];
      state.searchResults = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      // Fetch Product by ID
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      // Add Review
      .addCase(addReview.fulfilled, (state, action) => {
        state.product = action.payload;
      })

      // Fetch Reviews
      .addCase(fetchProductReviews.fulfilled, (state, action) => {
        state.reviews = action.payload.reviews;
      })

      // Fetch Top-Rated Products
      .addCase(fetchTopRatedProducts.fulfilled, (state, action) => {
        state.topRatedProducts = action.payload;
      })

      // Fetch Featured Products
      .addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
        state.featuredProducts = action.payload;
      })

      // Fetch New Arrivals
      .addCase(fetchNewArrivals.fulfilled, (state, action) => {
        state.newArrivals = action.payload;
      })

      // Fetch Best Sellers
      .addCase(fetchBestSellers.fulfilled, (state, action) => {
        state.bestSellers = action.payload;
      })

      // Fetch Product Statistics
      .addCase(fetchProductStats.fulfilled, (state, action) => {
        state.productStats = action.payload;
      })

      // Search Products
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.searchResults = action.payload;
      })

      // Bulk Update Products
      .addCase(bulkUpdateProducts.fulfilled, (state, action) => {
        // Update the products in the state if needed
        state.products = state.products.map((product) =>
          action.payload.ids.includes(product._id)
            ? { ...product, ...action.payload.updates }
            : product
        );
      })

      // Fetch Similar Products
      .addCase(fetchSimilarProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSimilarProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.similarProducts = action.payload;
      })
      .addCase(fetchSimilarProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const { clearProductState } = productSlice.actions;
export default productSlice.reducer;