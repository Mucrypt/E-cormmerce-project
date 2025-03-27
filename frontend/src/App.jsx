import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import UserLayout from './components/Layout/UserLayout'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import CollectionPage from './pages/CollectionPage'
import Checkout from './components/Cart/Checkout'
import OrderConfirmationPage from './pages/OrderConfirmationPage'
import OrderDetailsPage from './pages/OrderDetailsPage'
import MyOrdersPage from './pages/MyOrdersPage'
import CategoryPage from './pages/CategoryPage'
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
import AssignToCollectionPage from './pages/AdminPages/AssignToCollectionPage'
import ProductDetailsPage from './pages/ProductDetailsPage'
import { Provider } from 'react-redux'
import store from './redux/store'

// Import SuperAdmin components
import SuperAdminLayout from './components/SuperAdmin/SuperAdminLayout'
import SuperAdminDashboard from './pages/SuperAdminPages/SuperAdminDashboard'
import SuperAdminAdmins from './pages/SuperAdminPages/SuperAdminAdmins'
import SuperAdminRoles from './pages/SuperAdminPages/SuperAdminRoles'
import SuperAdminAuditLogs from './pages/SuperAdminPages/SuperAdminAuditLogs'
import SuperAdminProducts from './pages/SuperAdminPages/SuperAdminProducts'
import SuperAdminCategories from './pages/SuperAdminPages/SuperAdminCategories'
import SuperAdminCollections from './pages/SuperAdminPages/SuperAdminCollections'
import SuperAdminInventory from './pages/SuperAdminPages/SuperAdminInventory'
import SuperAdminOrders from './pages/SuperAdminPages/SuperAdminOrders'
import SuperAdminSalesReports from './pages/SuperAdminPages/SuperAdminSalesReports'
import SuperAdminUserAnalytics from './pages/SuperAdminPages/SuperAdminUserAnalytics'
import SuperAdminPerformance from './pages/SuperAdminPages/SuperAdminPerformance'
import SuperAdminMarketing from './pages/SuperAdminPages/SuperAdminMarketing'
import SuperAdminSystemSettings from './pages/SuperAdminPages/SuperAdminSystemSettings'
import SuperAdminDatabase from './pages/SuperAdminPages/SuperAdminDatabase'
import SuperAdminSecurity from './pages/SuperAdminPages/SuperAdminSecurity'
import SuperAdminApiManagement from './pages/SuperAdminPages/SuperAdminApiManagement'
import SuperAdminBackups from './pages/SuperAdminPages/SuperAdminBackups'
import SuperAdminDocumentation from './pages/SuperAdminPages/SuperAdminDocumentation'
import SuperAdminSupport from './pages/SuperAdminPages/SuperAdminSupport'
import SuperAdminPromotions from './pages/SuperAdminPages/SuperAdminPromotions'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        {/* Toastify Container */}
        <ToastContainer position='top-right' autoClose={3000} />

        <Routes>
          {/* User Routes */}
          <Route path='/' element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='profile' element={<Profile />} />
            <Route
              path='collections/:collection'
              element={<CollectionPage />}
            />
            <Route path='product/:id' element={<ProductDetailsPage />} />
            <Route path='category/:categoryId' element={<CategoryPage />} />
            <Route path='checkout' element={<Checkout />} />
            <Route
              path='order-confirmation'
              element={<OrderConfirmationPage />}
            />
            <Route path='order/:id' element={<OrderDetailsPage />} />
            <Route path='my-orders' element={<MyOrdersPage />} />
          </Route>

          {/* Admin Routes */}
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

          {/* Super Admin Routes */}
          <Route path='/superadmin' element={<SuperAdminLayout />}>
            <Route index element={<SuperAdminDashboard />} />

            {/* Administration Section */}
            <Route
              path='administration/admins'
              element={<SuperAdminAdmins />}
            />
            <Route path='administration/roles' element={<SuperAdminRoles />} />
            <Route
              path='administration/audit-logs'
              element={<SuperAdminAuditLogs />}
            />

            {/* Content Management */}
            <Route path='content/products' element={<SuperAdminProducts />} />
            <Route
              path='content/categories'
              element={<SuperAdminCategories />}
            />
            <Route
              path='content/collections'
              element={<SuperAdminCollections />}
            />
            <Route path='content/inventory' element={<SuperAdminInventory />} />

            {/* Orders & Payments */}
            <Route path='orders' element={<SuperAdminOrders />} />

            {/* Analytics */}
            <Route
              path='analytics/sales'
              element={<SuperAdminSalesReports />}
            />
            <Route
              path='analytics/users'
              element={<SuperAdminUserAnalytics />}
            />
            <Route
              path='analytics/performance'
              element={<SuperAdminPerformance />}
            />

            {/* Marketing */}
            <Route path='marketing' element={<SuperAdminMarketing />} />
            <Route
              path='marketing/promotions'
              element={<SuperAdminPromotions />}
            />

            {/* System Management */}
            <Route
              path='system/settings'
              element={<SuperAdminSystemSettings />}
            />
            <Route path='system/database' element={<SuperAdminDatabase />} />
            <Route path='system/security' element={<SuperAdminSecurity />} />
            <Route path='system/api' element={<SuperAdminApiManagement />} />
            <Route path='system/backups' element={<SuperAdminBackups />} />

            {/* Documentation & Support */}
            <Route path='documentation' element={<SuperAdminDocumentation />} />
            <Route path='support' element={<SuperAdminSupport />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
