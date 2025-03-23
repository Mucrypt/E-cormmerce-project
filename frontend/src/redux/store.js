import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import categoryReducer from './slices/categorySlice' // Import the categorySlice
import productReducer from './slices/productsSlice' // Corrected import path
import cartReducer from './slices/cartSlice' // Import the cartSlice
import checkoutReducer from './slices/checkoutSlice' // Import the checkoutSlice
import orderReducer from './slices/orderSlice' // Import the orderSlice
import adminReducer from './slices/adminSlice' // Import the adminSlice
import adminOrderReducer from './slices/adminOrderSlice' // Import the adminOrderSlice
import subscriberReducer from './slices/subscriberSlice' // Import the subscriberSlice
import productsReducer from './slices/productAdminSlice' // Import the productAdminSlice
import collectionsReducer from './slices/collectionsSlice' // Import the collectionSlice

const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoryReducer,
    products: productReducer, // Ensure this is included
    cart: cartReducer, // Add the cart reducer
    checkout: checkoutReducer, // Add the checkout reducer
    order: orderReducer, // Add the order reducer
    admin: adminReducer, // Add the admin reducer
   
    adminOrders: adminOrderReducer, // Add the admin order reducer
    subscribers: subscriberReducer, // Add the subscriber reducer
    adminProducts: productsReducer, // Add the product admin
    collections: collectionsReducer, // Add the collection reducer
   
  },
})

export default store
