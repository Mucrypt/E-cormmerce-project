// frontend/src/App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserLayout from './components/Layout/UserLayout'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import { Toaster } from 'sonner'
import CollectionPage from './pages/CollectionPage'
import Checkout from './components/Cart/Checkout'
import OrderConfirmationPage from './pages/OrderConfirmationPage'
import OrderDetailsPage from './pages/OrderDetailsPage'
import MyOrdersPage from './pages/MyOrdersPage'
import CategoryPage from './pages/CategoryPage'

//Admin import
import AdminLayout from './components/Admin/AdminLayout'
import AdminHomePage from './pages/AdminPages/AdminHomePage'
import AdminUsersPage from './pages/AdminPages/AdminUsersPage'
import AdminProductsPage from './pages/AdminPages/AdminProductsPage'
import AdminOrdersPage from './pages/AdminPages/AdminOrdersPage'
import AdminCategoriesPage from './pages/AdminPages/AdminCategoriesPage'
import AdminAnalyticsPage from './pages/AdminPages/AdminAnalyticsPage'
import AdminSettingsPage from './pages/AdminPages/AdminSettingsPage'
import AdminReportsPage from './pages/AdminPages/AdminReportsPage'
import AdminContentPage from './pages/AdminPages/AdminContentPage'
import AdminMarketingPage from './pages/AdminPages/AdminMarketingPage'
import AdminInventoryPage from './pages/AdminPages/AdminInventoryPage'
import AdminSupportPage from './pages/AdminPages/AdminSupportPage'
import AdminCollectionsPage from './pages/AdminPages/AdminCollectionsPage'
import AdminDashboard from './pages/AdminPages/AdminDashboard'
import {Provider} from 'react-redux'
import store from './redux/store'
import ProductDetailsPage from "./pages/ProductDetailsPage"
import AssignToCollectionPage from './pages/AdminPages/AssignToCollectionPage'




function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Toaster position='top-right' reverseOrder={false} />

        <Routes>
          {/* User Layout */}
          <Route path='/' element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='profile' element={<Profile />} />
            <Route
              path='collections/:collection'
              element={<CollectionPage />}
            />
            <Route path='/product/:id' element={<ProductDetailsPage />} />
            <Route path='/category/:categoryId' element={<CategoryPage />} />

            <Route path='checkout' element={<Checkout />} />
            <Route
              path='order-confirmation'
              element={<OrderConfirmationPage />}
            />
            <Route path='order/:id' element={<OrderDetailsPage />} />
            <Route path='my-orders' element={<MyOrdersPage />} />
          </Route>

          {/* Admin Layout */}
          <Route path='/admin' element={<AdminLayout />}>
            <Route index element={<AdminHomePage />} />
            <Route path='users' element={<AdminUsersPage />} />
            <Route path='products' element={<AdminProductsPage />} />
            <Route path='orders' element={<AdminOrdersPage />} />
            <Route path='categories' element={<AdminCategoriesPage />} />
            <Route path='analytics' element={<AdminAnalyticsPage />} />
            <Route path='settings' element={<AdminSettingsPage />} />
            <Route
              path='collections-assign'
              element={<AssignToCollectionPage />}
            />

            <Route path='reports' element={<AdminReportsPage />} />
            <Route path='content' element={<AdminContentPage />} />
            <Route path='marketing' element={<AdminMarketingPage />} />
            <Route path='inventory' element={<AdminInventoryPage />} />
            <Route path='support' element={<AdminSupportPage />} />
            <Route path='collections' element={<AdminCollectionsPage />} />
            <Route path='dashboard' element={<AdminDashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
