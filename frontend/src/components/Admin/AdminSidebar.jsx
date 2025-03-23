import {
  FaBoxOpen,
  FaClipboardList,
  FaUser,
  FaChartLine,
  FaCog,
  FaTags,
  FaShoppingCart,
  FaHeadset,
  FaFileAlt,
  FaSignOutAlt,
  FaBullhorn,
  FaLayerGroup, // Add this icon for collections
} from 'react-icons/fa'
import { Link, NavLink, useNavigate } from 'react-router-dom'

const AdminSidebar = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    navigate('/')
  }

  return (
    <div className='p-6 bg-gray-900 text-white h-screen flex flex-col fixed w-full md:w-64'>
      {/* Header */}
      <div className='mb-6'>
        <Link to='/admin' className='text-2xl font-semibold text-white'>
          MUKULAH
        </Link>
      </div>
      <h2 className='text-xl font-semibold mb-4'>Admin Dashboard</h2>
      {/** Spacer */}
      <div className='w-full h-0.5 bg-white my-2 opacity-20'></div>

      {/* Scrollable Navigation Links */}
      <div className='flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900'>
        <style>
          {`
            .scrollbar-thin::-webkit-scrollbar {
              width: 6px; /* Adjust the width of the scrollbar */
            }
            .scrollbar-thin::-webkit-scrollbar-thumb {
              background-color: #4a5568; /* Scrollbar thumb color */
              border-radius: 3px; /* Rounded corners for the thumb */
            }
            .scrollbar-thin::-webkit-scrollbar-track {
              background-color: #1a202c; /* Scrollbar track color */
            }
          `}
        </style>
        <nav className='flex flex-col space-y-2 pr-2'>
          {/* Dashboard */}
          <NavLink
            to='/admin/dashboard'
            className={({ isActive }) =>
              isActive
                ? 'bg-gray-700 text-white py-3 px-4 rounded-md flex items-center space-x-2'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded-md flex items-center space-x-2'
            }
          >
            <FaChartLine />
            <span>Dashboard</span>
          </NavLink>

          {/* Users */}
          <NavLink
            to='/admin/users'
            className={({ isActive }) =>
              isActive
                ? 'bg-gray-700 text-white py-3 px-4 rounded-md flex items-center space-x-2'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded-md flex items-center space-x-2'
            }
          >
            <FaUser />
            <span>Users</span>
          </NavLink>

          {/* Products */}
          <NavLink
            to='/admin/products'
            className={({ isActive }) =>
              isActive
                ? 'bg-gray-700 text-white py-3 px-4 rounded-md flex items-center space-x-2'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded-md flex items-center space-x-2'
            }
          >
            <FaBoxOpen />
            <span>Products</span>
          </NavLink>

          {/* Orders */}
          <NavLink
            to='/admin/orders'
            className={({ isActive }) =>
              isActive
                ? 'bg-gray-700 text-white py-3 px-4 rounded-md flex items-center space-x-2'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded-md flex items-center space-x-2'
            }
          >
            <FaClipboardList />
            <span>Orders</span>
          </NavLink>

          {/* Categories */}
          <NavLink
            to='/admin/categories'
            className={({ isActive }) =>
              isActive
                ? 'bg-gray-700 text-white py-3 px-4 rounded-md flex items-center space-x-2'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded-md flex items-center space-x-2'
            }
          >
            <FaTags />
            <span>Categories</span>
          </NavLink>

          {/* Collections */}
          <NavLink
            to='/admin/collections'
            className={({ isActive }) =>
              isActive
                ? 'bg-gray-700 text-white py-3 px-4 rounded-md flex items-center space-x-2'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded-md flex items-center space-x-2'
            }
          >
            <FaLayerGroup /> {/* Icon for collections */}
            <span>Collections</span>
          </NavLink>

          {/* Inventory */}
          <NavLink
            to='/admin/inventory'
            className={({ isActive }) =>
              isActive
                ? 'bg-gray-700 text-white py-3 px-4 rounded-md flex items-center space-x-2'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded-md flex items-center space-x-2'
            }
          >
            <FaShoppingCart />
            <span>Inventory</span>
          </NavLink>

          {/* Analytics */}
          <NavLink
            to='/admin/analytics'
            className={({ isActive }) =>
              isActive
                ? 'bg-gray-700 text-white py-3 px-4 rounded-md flex items-center space-x-2'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded-md flex items-center space-x-2'
            }
          >
            <FaChartLine />
            <span>Analytics</span>
          </NavLink>

          {/* Marketing */}
          <NavLink
            to='/admin/marketing'
            className={({ isActive }) =>
              isActive
                ? 'bg-gray-700 text-white py-3 px-4 rounded-md flex items-center space-x-2'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded-md flex items-center space-x-2'
            }
          >
            <FaBullhorn />
            <span>Marketing</span>
          </NavLink>

          {/* Content Management */}
          <NavLink
            to='/admin/content'
            className={({ isActive }) =>
              isActive
                ? 'bg-gray-700 text-white py-3 px-4 rounded-md flex items-center space-x-2'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded-md flex items-center space-x-2'
            }
          >
            <FaFileAlt />
            <span>Content Management</span>
          </NavLink>

          {/* Settings */}
          <NavLink
            to='/admin/settings'
            className={({ isActive }) =>
              isActive
                ? 'bg-gray-700 text-white py-3 px-4 rounded-md flex items-center space-x-2'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded-md flex items-center space-x-2'
            }
          >
            <FaCog />
            <span>Settings</span>
          </NavLink>

          {/* Reports */}
          <NavLink
            to='/admin/reports'
            className={({ isActive }) =>
              isActive
                ? 'bg-gray-700 text-white py-3 px-4 rounded-md flex items-center space-x-2'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded-md flex items-center space-x-2'
            }
          >
            <FaFileAlt />
            <span>Reports</span>
          </NavLink>

          {/* Support */}
          <NavLink
            to='/admin/support'
            className={({ isActive }) =>
              isActive
                ? 'bg-gray-700 text-white py-3 px-4 rounded-md flex items-center space-x-2'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded-md flex items-center space-x-2'
            }
          >
            <FaHeadset />
            <span>Support</span>
          </NavLink>
        </nav>
      </div>

      {/* Logout Button */}
      <div className='mt-6'>
        <button
          onClick={handleLogout}
          className='bg-red-500 text-white w-full rounded-md hover:bg-red-600 py-2 px-4 flex items-center justify-center space-x-2'
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </div>
  )
}

export default AdminSidebar
