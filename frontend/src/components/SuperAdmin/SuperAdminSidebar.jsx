import {
  FaTachometerAlt,
  FaUsers,
  FaUserShield,
  FaBoxes,
  FaShoppingCart,
  FaChartBar,
  FaCog,
  FaFileAlt,
  FaTags,
  FaLayerGroup,
  FaBullhorn,
  FaHeadset,
  FaDatabase,
  FaServer,
  FaShieldAlt,
  FaNetworkWired,
  FaMoneyBillWave,
  FaSignOutAlt,
  FaChevronDown,
  FaChevronRight,
} from 'react-icons/fa'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const SuperAdminSidebar = () => {
  const navigate = useNavigate()
  const [expandedSections, setExpandedSections] = useState({
    administration: true,
    content: false,
    analytics: false,
    system: false,
  })

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const handleLogout = () => {
    navigate('/')
  }

  return (
    <div className='p-6 bg-superadmin-800 text-white h-screen flex flex-col fixed w-72 bg-gray-700'>
      {/* Header */}
      <div className='mb-6 flex items-center justify-between'>
        <Link
          to='/superadmin'
          className='text-2xl font-bold text-white flex items-center'
        >
          <span className='bg-superadmin-600 p-2 rounded-md mr-2'>
            <FaUserShield />
          </span>
          <span>SuperAdmin</span>
        </Link>
      </div>

      {/* Quick Stats Bar */}
      <div className='mb-6 bg-superadmin-700 rounded-lg p-3'>
        <div className='flex justify-between items-center text-xs'>
          <div className='text-center'>
            <div className='font-bold'>24</div>
            <div className='text-superadmin-300'>Admins</div>
          </div>
          <div className='h-6 w-px bg-superadmin-600'></div>
          <div className='text-center'>
            <div className='font-bold'>1.2K</div>
            <div className='text-superadmin-300'>Users</div>
          </div>
          <div className='h-6 w-px bg-superadmin-600'></div>
          <div className='text-center'>
            <div className='font-bold'>98%</div>
            <div className='text-superadmin-300'>Uptime</div>
          </div>
        </div>
      </div>

      {/* Scrollable Navigation */}
      <div className='flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-superadmin-600 scrollbar-track-superadmin-800'>
        <nav className='flex flex-col space-y-1 pr-2'>
          {/* Dashboard */}
          <NavLink
            to='/superadmin'
            className={({ isActive }) =>
              isActive
                ? 'bg-superadmin-700 text-white py-3 px-4 rounded-md flex items-center space-x-3 font-medium'
                : 'text-superadmin-200 hover:bg-superadmin-700 hover:text-white py-3 px-4 rounded-md flex items-center space-x-3'
            }
          >
            <FaTachometerAlt className='text-lg' />
            <span>Dashboard</span>
          </NavLink>

          {/* Administration Section */}
          <div>
            <button
              onClick={() => toggleSection('administration')}
              className='w-full text-left py-3 px-4 rounded-md flex items-center justify-between hover:bg-superadmin-700'
            >
              <div className='flex items-center space-x-3'>
                <FaUserShield className='text-lg' />
                <span className='font-medium'>Administration</span>
              </div>
              {expandedSections.administration ? (
                <FaChevronDown size={12} />
              ) : (
                <FaChevronRight size={12} />
              )}
            </button>

            {expandedSections.administration && (
              <div className='ml-9 space-y-1 mt-1'>
                <NavLink
                  to='/superadmin/administration/admins'
                  className={({ isActive }) =>
                    isActive
                      ? 'bg-superadmin-600 text-white py-2 px-3 rounded-md flex items-center space-x-2 text-sm'
                      : 'text-superadmin-200 hover:bg-superadmin-600 hover:text-white py-2 px-3 rounded-md flex items-center space-x-2 text-sm'
                  }
                >
                  <FaUsers className='mr-1 text-sm' />
                  <span>Admin Users</span>
                </NavLink>
                <NavLink
                  to='/superadmin/administration/roles'
                  className={({ isActive }) =>
                    isActive
                      ? 'bg-superadmin-600 text-white py-2 px-3 rounded-md flex items-center space-x-2 text-sm'
                      : 'text-superadmin-200 hover:bg-superadmin-600 hover:text-white py-2 px-3 rounded-md flex items-center space-x-2 text-sm'
                  }
                >
                  <FaShieldAlt className='mr-1 text-sm' />
                  <span>Roles & Permissions</span>
                </NavLink>
                <NavLink
                  to='/superadmin/administration/audit-logs'
                  className={({ isActive }) =>
                    isActive
                      ? 'bg-superadmin-600 text-white py-2 px-3 rounded-md flex items-center space-x-2 text-sm'
                      : 'text-superadmin-200 hover:bg-superadmin-600 hover:text-white py-2 px-3 rounded-md flex items-center space-x-2 text-sm'
                  }
                >
                  <FaFileAlt className='mr-1 text-sm' />
                  <span>Audit Logs</span>
                </NavLink>
              </div>
            )}
          </div>

          {/* Content Management Section */}
          <div>
            <button
              onClick={() => toggleSection('content')}
              className='w-full text-left py-3 px-4 rounded-md flex items-center justify-between hover:bg-superadmin-700'
            >
              <div className='flex items-center space-x-3'>
                <FaBoxes className='text-lg' />
                <span className='font-medium'>Content</span>
              </div>
              {expandedSections.content ? (
                <FaChevronDown size={12} />
              ) : (
                <FaChevronRight size={12} />
              )}
            </button>

            {expandedSections.content && (
              <div className='ml-9 space-y-1 mt-1'>
                <NavLink
                  to='/superadmin/content/products'
                  className={({ isActive }) =>
                    isActive
                      ? 'bg-superadmin-600 text-white py-2 px-3 rounded-md flex items-center space-x-2 text-sm'
                      : 'text-superadmin-200 hover:bg-superadmin-600 hover:text-white py-2 px-3 rounded-md flex items-center space-x-2 text-sm'
                  }
                >
                  <FaTags className='mr-1 text-sm' />
                  <span>Products</span>
                </NavLink>
                <NavLink
                  to='/superadmin/content/categories'
                  className={({ isActive }) =>
                    isActive
                      ? 'bg-superadmin-600 text-white py-2 px-3 rounded-md flex items-center space-x-2 text-sm'
                      : 'text-superadmin-200 hover:bg-superadmin-600 hover:text-white py-2 px-3 rounded-md flex items-center space-x-2 text-sm'
                  }
                >
                  <FaLayerGroup className='mr-1 text-sm' />
                  <span>Categories</span>
                </NavLink>
                <NavLink
                  to='/superadmin/content/collections'
                  className={({ isActive }) =>
                    isActive
                      ? 'bg-superadmin-600 text-white py-2 px-3 rounded-md flex items-center space-x-2 text-sm'
                      : 'text-superadmin-200 hover:bg-superadmin-600 hover:text-white py-2 px-3 rounded-md flex items-center space-x-2 text-sm'
                  }
                >
                  <FaBoxes className='mr-1 text-sm' />
                  <span>Collections</span>
                </NavLink>
                <NavLink
                  to='/superadmin/content/inventory'
                  className={({ isActive }) =>
                    isActive
                      ? 'bg-superadmin-600 text-white py-2 px-3 rounded-md flex items-center space-x-2 text-sm'
                      : 'text-superadmin-200 hover:bg-superadmin-600 hover:text-white py-2 px-3 rounded-md flex items-center space-x-2 text-sm'
                  }
                >
                  <FaDatabase className='mr-1 text-sm' />
                  <span>Inventory</span>
                </NavLink>
              </div>
            )}
          </div>

          {/* Orders & Payments */}
          <NavLink
            to='/superadmin/orders'
            className={({ isActive }) =>
              isActive
                ? 'bg-superadmin-700 text-white py-3 px-4 rounded-md flex items-center space-x-3 font-medium'
                : 'text-superadmin-200 hover:bg-superadmin-700 hover:text-white py-3 px-4 rounded-md flex items-center space-x-3'
            }
          >
            <FaShoppingCart className='text-lg' />
            <span>Orders & Payments</span>
          </NavLink>

          {/* Analytics Section */}
          <div>
            <button
              onClick={() => toggleSection('analytics')}
              className='w-full text-left py-3 px-4 rounded-md flex items-center justify-between hover:bg-superadmin-700'
            >
              <div className='flex items-center space-x-3'>
                <FaChartBar className='text-lg' />
                <span className='font-medium'>Analytics</span>
              </div>
              {expandedSections.analytics ? (
                <FaChevronDown size={12} />
              ) : (
                <FaChevronRight size={12} />
              )}
            </button>

            {expandedSections.analytics && (
              <div className='ml-9 space-y-1 mt-1'>
                <NavLink
                  to='/superadmin/analytics/sales'
                  className={({ isActive }) =>
                    isActive
                      ? 'bg-superadmin-600 text-white py-2 px-3 rounded-md flex items-center space-x-2 text-sm'
                      : 'text-superadmin-200 hover:bg-superadmin-600 hover:text-white py-2 px-3 rounded-md flex items-center space-x-2 text-sm'
                  }
                >
                  <FaMoneyBillWave className='mr-1 text-sm' />
                  <span>Sales Reports</span>
                </NavLink>
                <NavLink
                  to='/superadmin/analytics/users'
                  className={({ isActive }) =>
                    isActive
                      ? 'bg-superadmin-600 text-white py-2 px-3 rounded-md flex items-center space-x-2 text-sm'
                      : 'text-superadmin-200 hover:bg-superadmin-600 hover:text-white py-2 px-3 rounded-md flex items-center space-x-2 text-sm'
                  }
                >
                  <FaUsers className='mr-1 text-sm' />
                  <span>User Analytics</span>
                </NavLink>
                <NavLink
                  to='/superadmin/analytics/performance'
                  className={({ isActive }) =>
                    isActive
                      ? 'bg-superadmin-600 text-white py-2 px-3 rounded-md flex items-center space-x-2 text-sm'
                      : 'text-superadmin-200 hover:bg-superadmin-600 hover:text-white py-2 px-3 rounded-md flex items-center space-x-2 text-sm'
                  }
                >
                  <FaTachometerAlt className='mr-1 text-sm' />
                  <span>Performance Metrics</span>
                </NavLink>
              </div>
            )}
          </div>

          {/* Marketing Section */}
          <div>
            <button
              onClick={() => toggleSection('marketing')}
              className='w-full text-left py-3 px-4 rounded-md flex items-center justify-between hover:bg-superadmin-700'
            >
              <div className='flex items-center space-x-3'>
                <FaBullhorn className='text-lg' />
                <span className='font-medium'>Marketing</span>
              </div>
              {expandedSections.marketing ? (
                <FaChevronDown size={12} />
              ) : (
                <FaChevronRight size={12} />
              )}
            </button>

            {expandedSections.marketing && (
              <div className='ml-9 space-y-1 mt-1'>
                <NavLink
                  to='/superadmin/marketing'
                  className={({ isActive }) =>
                    isActive
                      ? 'bg-superadmin-600 text-white py-2 px-3 rounded-md flex items-center space-x-2 text-sm'
                      : 'text-superadmin-200 hover:bg-superadmin-600 hover:text-white py-2 px-3 rounded-md flex items-center space-x-2 text-sm'
                  }
                >
                  <FaBullhorn className='mr-1 text-sm' />
                  <span>Campaigns</span>
                </NavLink>
                <NavLink
                  to='/superadmin/marketing/promotions'
                  className={({ isActive }) =>
                    isActive
                      ? 'bg-superadmin-600 text-white py-2 px-3 rounded-md flex items-center space-x-2 text-sm'
                      : 'text-superadmin-200 hover:bg-superadmin-600 hover:text-white py-2 px-3 rounded-md flex items-center space-x-2 text-sm'
                  }
                >
                  <FaTags className='mr-1 text-sm' />
                  <span>Promotions</span>
                </NavLink>
              </div>
            )}
          </div>

          {/* System Section */}
          <div>
            <button
              onClick={() => toggleSection('system')}
              className='w-full text-left py-3 px-4 rounded-md flex items-center justify-between hover:bg-superadmin-700'
            >
              <div className='flex items-center space-x-3'>
                <FaCog className='text-lg' />
                <span className='font-medium'>System</span>
              </div>
              {expandedSections.system ? (
                <FaChevronDown size={12} />
              ) : (
                <FaChevronRight size={12} />
              )}
            </button>

            {expandedSections.system && (
              <div className='ml-9 space-y-1 mt-1'>
                <NavLink
                  to='/superadmin/system/settings'
                  className={({ isActive }) =>
                    isActive
                      ? 'bg-superadmin-600 text-white py-2 px-3 rounded-md flex items-center space-x-2 text-sm'
                      : 'text-superadmin-200 hover:bg-superadmin-600 hover:text-white py-2 px-3 rounded-md flex items-center space-x-2 text-sm'
                  }
                >
                  <FaCog className='mr-1 text-sm' />
                  <span>System Settings</span>
                </NavLink>
                <NavLink
                  to='/superadmin/system/database'
                  className={({ isActive }) =>
                    isActive
                      ? 'bg-superadmin-600 text-white py-2 px-3 rounded-md flex items-center space-x-2 text-sm'
                      : 'text-superadmin-200 hover:bg-superadmin-600 hover:text-white py-2 px-3 rounded-md flex items-center space-x-2 text-sm'
                  }
                >
                  <FaDatabase className='mr-1 text-sm' />
                  <span>Database Management</span>
                </NavLink>
                <NavLink
                  to='/superadmin/system/security'
                  className={({ isActive }) =>
                    isActive
                      ? 'bg-superadmin-600 text-white py-2 px-3 rounded-md flex items-center space-x-2 text-sm'
                      : 'text-superadmin-200 hover:bg-superadmin-600 hover:text-white py-2 px-3 rounded-md flex items-center space-x-2 text-sm'
                  }
                >
                  <FaShieldAlt className='mr-1 text-sm' />
                  <span>Security Center</span>
                </NavLink>
                <NavLink
                  to='/superadmin/system/api'
                  className={({ isActive }) =>
                    isActive
                      ? 'bg-superadmin-600 text-white py-2 px-3 rounded-md flex items-center space-x-2 text-sm'
                      : 'text-superadmin-200 hover:bg-superadmin-600 hover:text-white py-2 px-3 rounded-md flex items-center space-x-2 text-sm'
                  }
                >
                  <FaNetworkWired className='mr-1 text-sm' />
                  <span>API Management</span>
                </NavLink>
                <NavLink
                  to='/superadmin/system/backups'
                  className={({ isActive }) =>
                    isActive
                      ? 'bg-superadmin-600 text-white py-2 px-3 rounded-md flex items-center space-x-2 text-sm'
                      : 'text-superadmin-200 hover:bg-superadmin-600 hover:text-white py-2 px-3 rounded-md flex items-center space-x-2 text-sm'
                  }
                >
                  <FaServer className='mr-1 text-sm' />
                  <span>Backups</span>
                </NavLink>
              </div>
            )}
          </div>

          {/* Documentation */}
          <NavLink
            to='/superadmin/documentation'
            className={({ isActive }) =>
              isActive
                ? 'bg-superadmin-700 text-white py-3 px-4 rounded-md flex items-center space-x-3 font-medium'
                : 'text-superadmin-200 hover:bg-superadmin-700 hover:text-white py-3 px-4 rounded-md flex items-center space-x-3'
            }
          >
            <FaFileAlt className='text-lg' />
            <span>Documentation</span>
          </NavLink>

          {/* Support */}
          <NavLink
            to='/superadmin/support'
            className={({ isActive }) =>
              isActive
                ? 'bg-superadmin-700 text-white py-3 px-4 rounded-md flex items-center space-x-3 font-medium'
                : 'text-superadmin-200 hover:bg-superadmin-700 hover:text-white py-3 px-4 rounded-md flex items-center space-x-3'
            }
          >
            <FaHeadset className='text-lg' />
            <span>Support Center</span>
          </NavLink>
        </nav>
      </div>

      {/* Footer */}
      <div className='mt-auto pt-4 border-t border-superadmin-700'>
        <div className='text-xs text-superadmin-300 mb-2'>
          <div>
            System Status: <span className='text-green-400'>Operational</span>
          </div>
          <div>Version: 3.2.1</div>
        </div>
        <button
          onClick={handleLogout}
          className='w-full bg-superadmin-700 hover:bg-superadmin-600 text-white py-2 px-4 rounded-md flex items-center justify-center space-x-2'
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </div>
  )
}

export default SuperAdminSidebar
