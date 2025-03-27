import { useState, useEffect } from 'react'
import {
  FaBars,
  FaBell,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaSearch,
  FaQuestionCircle,
  FaGlobe,
  FaChevronDown,
  FaChevronRight,
  FaClipboardList,
} from 'react-icons/fa'
import SuperAdminSidebar from './SuperAdminSidebar'
import { Outlet, Link, useLocation } from 'react-router-dom'

const SuperAdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isHelpOpen, setIsHelpOpen] = useState(false)
  const [currentPath, setCurrentPath] = useState('')
  const location = useLocation()

  useEffect(() => {
    setCurrentPath(location.pathname)
  }, [location])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const toggleNotification = () => {
    setIsNotificationOpen(!isNotificationOpen)
    setIsProfileOpen(false)
    setIsHelpOpen(false)
  }

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen)
    setIsNotificationOpen(false)
    setIsHelpOpen(false)
  }

  const toggleHelp = () => {
    setIsHelpOpen(!isHelpOpen)
    setIsNotificationOpen(false)
    setIsProfileOpen(false)
  }

  // Get current page title based on route
  const getPageTitle = () => {
    const pathParts = currentPath.split('/').filter((part) => part !== '')
    if (pathParts.length < 2) return 'Dashboard'

    const page = pathParts[1]
    return page.charAt(0).toUpperCase() + page.slice(1).replace('-', ' ')
  }

  return (
    <div className='min-h-screen flex flex-col md:flex-row  bg-gray-50 relative  '>
      {/** Mobile Toggle Button */}
      <div className='md:hidden flex items-center justify-between p-4 bg-superadmin-800 text-white z-30'>
        <div className='flex items-center'>
          <button onClick={toggleSidebar} className='mr-4'>
            <FaBars size={20} />
          </button>
          <h1 className='text-xl font-semibold'>SuperAdmin Console</h1>
        </div>
        <div className='flex items-center space-x-3'>
          <button onClick={toggleHelp} className='p-1'>
            <FaQuestionCircle size={18} />
          </button>
          <button onClick={toggleNotification} className='p-1 relative'>
            <FaBell size={18} />
            <span className='absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1 py-0.5'>
              3
            </span>
          </button>
        </div>
      </div>

      {/** Overlay for Mobile Sidebar */}
      {isSidebarOpen && (
        <div
          onClick={toggleSidebar}
          className='fixed inset-0 md:hidden bg-black bg-opacity-50 z-20'
        ></div>
      )}

      {/** Sidebar */}
      <div
        className={`w-72 md:relative transform fixed bg-superadmin-800 text-white min-h-screen ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-300 md:static md:block z-20`}
      >
        <SuperAdminSidebar />
      </div>

      {/** Main Content */}
      <div className='flex-grow overflow-auto'>
        {/** Top Navigation Bar */}
        <div className='bg-gray-700 border-b border-gray-900 p-4'>
          <div className='flex flex-col md:flex-row justify-between items-start md:items-center'>
            {/** Breadcrumbs and Page Title */}
            <div className='mb-3 md:mb-0'>
              <h1 className='text-2xl font-bold text-gray-200'>
                {getPageTitle()}
              </h1>
              <div className='flex items-center text-sm text-gray-200'>
                <Link to='/superadmin' className='hover:text-superadmin-600'>
                  Home
                </Link>
                {currentPath
                  .split('/')
                  .filter((part) => part !== '')
                  .slice(1)
                  .map((part, index, array) => (
                    <span key={index} className='flex items-center'>
                      <FaChevronRight className='mx-2 text-xs' />
                      <Link
                        to={`/${array.slice(0, index + 1).join('/')}`}
                        className='hover:text-superadmin-600 capitalize'
                      >
                        {part.replace('-', ' ')}
                      </Link>
                    </span>
                  ))}
              </div>
            </div>

            {/** Top Right Controls */}
            <div className='flex items-center space-x-4 w-full md:w-auto'>
              {/** Search Bar */}
              <div className='relative flex-grow md:flex-grow-0 md:w-64'>
                <input
                  type='text'
                  placeholder='Search across console...'
                  className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-superadmin-500 focus:border-superadmin-500'
                />
                <FaSearch className='absolute left-3 top-3 text-gray-400' />
              </div>

              {/** Help Center */}
              <div className='relative hidden md:block'>
                <button
                  onClick={toggleHelp}
                  className='p-2 text-gray-200 hover:text-superadmin-600 hover:bg-gray-600 rounded-full'
                >
                  <FaQuestionCircle size={18} />
                </button>
                {isHelpOpen && (
                  <div className='absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl z-30 border border-gray-200'>
                    <div className='p-4'>
                      <h3 className='text-lg font-semibold text-gray-800 mb-2'>
                        Help Center
                      </h3>
                      <div className='space-y-2'>
                        <Link
                          to='/superadmin/help/documentation'
                          className='block p-2 hover:bg-gray-50 rounded-md text-sm text-gray-700'
                        >
                          Documentation
                        </Link>
                        <Link
                          to='/superadmin/help/support'
                          className='block p-2 hover:bg-gray-50 rounded-md text-sm text-gray-700'
                        >
                          Contact Support
                        </Link>
                        <Link
                          to='/superadmin/help/training'
                          className='block p-2 hover:bg-gray-50 rounded-md text-sm text-gray-700'
                        >
                          Training Videos
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/** Language Selector */}
              <div className='hidden md:block relative group'>
                <button className='flex items-center space-x-1 p-2 text-gray-200 hover:text-superadmin-600 hover:bg-gray-600 rounded-full'>
                  <FaGlobe size={16} />
                  <span className='text-sm'>EN</span>
                  <FaChevronDown size={12} />
                </button>
                <div className='absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-xl z-30 border border-gray-700 hidden group-hover:block'>
                  <div className='p-2'>
                    <button className='w-full text-left p-2 hover:bg-gray-50 rounded-md text-sm text-gray-700'>
                      English (EN)
                    </button>
                    <button className='w-full text-left p-2 hover:bg-gray-50 rounded-md text-sm text-gray-700'>
                      Español (ES)
                    </button>
                    <button className='w-full text-left p-2 hover:bg-gray-50 rounded-md text-sm text-gray-700'>
                      Français (FR)
                    </button>
                  </div>
                </div>
              </div>

              {/** Notification Button */}
              <div className='relative'>
                <button
                  onClick={toggleNotification}
                  className='p-2 text-gray-200 hover:text-superadmin-600 hover:bg-gray-600 rounded-full relative'
                >
                  <FaBell size={18} />
                  <span className='absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5'>
                    3
                  </span>
                </button>
                {/** Notification Dropdown */}
                {isNotificationOpen && (
                  <div className='absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-30 border border-gray-700'>
                    <div className='p-4'>
                      <div className='flex justify-between items-center mb-3'>
                        <h3 className='text-lg font-semibold text-gray-800'>
                          Notifications
                        </h3>
                        <button className='text-sm text-superadmin-600 hover:text-superadmin-700'>
                          Mark all as read
                        </button>
                      </div>
                      <ul className='space-y-2 max-h-96 overflow-y-auto'>
                        <li className='border-b border-gray-100 pb-2'>
                          <Link
                            to='/superadmin/notifications/1'
                            className='block p-2 hover:bg-gray-50 rounded-md'
                          >
                            <div className='flex items-start'>
                              <div className='bg-blue-100 p-2 rounded-full mr-3'>
                                <FaUser className='text-blue-500' />
                              </div>
                              <div>
                                <p className='text-sm font-medium text-gray-800'>
                                  New admin user registered
                                </p>
                                <p className='text-xs text-gray-500'>
                                  5 minutes ago
                                </p>
                              </div>
                            </div>
                          </Link>
                        </li>
                        <li className='border-b border-gray-100 pb-2'>
                          <Link
                            to='/superadmin/notifications/2'
                            className='block p-2 hover:bg-gray-50 rounded-md'
                          >
                            <div className='flex items-start'>
                              <div className='bg-green-100 p-2 rounded-full mr-3'>
                                <FaClipboardList className='text-green-500' />
                              </div>
                              <div>
                                <p className='text-sm font-medium text-gray-800'>
                                  System update available
                                </p>
                                <p className='text-xs text-gray-500'>
                                  2 hours ago
                                </p>
                              </div>
                            </div>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to='/superadmin/notifications/3'
                            className='block p-2 hover:bg-gray-50 rounded-md'
                          >
                            <div className='flex items-start'>
                              <div className='bg-yellow-100 p-2 rounded-full mr-3'>
                                <FaCog className='text-yellow-500' />
                              </div>
                              <div>
                                <p className='text-sm font-medium text-gray-800'>
                                  Security alert: Unusual login detected
                                </p>
                                <p className='text-xs text-gray-500'>
                                  Yesterday
                                </p>
                              </div>
                            </div>
                          </Link>
                        </li>
                      </ul>
                      <div className='mt-3 pt-3 border-t border-gray-200'>
                        <Link
                          to='/superadmin/notifications'
                          className='text-sm text-superadmin-600 hover:text-superadmin-700 block text-center'
                        >
                          View all notifications
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/** User Profile Dropdown */}
              <div className='relative'>
                <button
                  onClick={toggleProfile}
                  className='flex items-center space-x-2 p-1 bg-gray-200 hover:bg-gray-300 rounded-full '
                >
                  <img
                    src='https://randomuser.me/api/portraits/men/75.jpg'
                    alt='SuperAdmin Avatar'
                    className='w-8 h-8 rounded-full'
                  />
                  <span className='hidden md:inline text-sm font-medium text-gray-700'>
                    Super Admin
                  </span>
                  <FaChevronDown className='hidden md:inline text-xs text-gray-500' />
                </button>
                {/** Profile Dropdown */}
                {isProfileOpen && (
                  <div className='absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl z-30 border border-gray-200'>
                    <div className='p-4 border-b border-gray-200'>
                      <div className='flex items-center space-x-3'>
                        <img
                          src='https://randomuser.me/api/portraits/men/75.jpg'
                          alt='SuperAdmin Avatar'
                          className='w-10 h-10 rounded-full'
                        />
                        <div>
                          <p className='text-sm font-medium text-gray-800'>
                            Super Admin
                          </p>
                          <p className='text-xs text-gray-500'>
                            admin@example.com
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className='p-2'>
                      <Link
                        to='/superadmin/profile'
                        className='flex items-center space-x-2 p-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md'
                      >
                        <FaUser className='text-gray-500' />
                        <span>Your Profile</span>
                      </Link>
                      <Link
                        to='/superadmin/settings'
                        className='flex items-center space-x-2 p-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md'
                      >
                        <FaCog className='text-gray-500' />
                        <span>Account Settings</span>
                      </Link>
                    </div>
                    <div className='p-2 border-t border-gray-200'>
                      <button
                        onClick={() => {
                          // Handle logout logic here
                          console.log('Logout clicked')
                        }}
                        className='flex items-center space-x-2 w-full p-2 text-sm text-red-600 hover:bg-red-50 rounded-md'
                      >
                        <FaSignOutAlt />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/** Main Content Area */}
        <div className='container mx-auto p-4 md:p-6 overflow-auto'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default SuperAdminLayout
