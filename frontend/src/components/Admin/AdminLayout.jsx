import { useState } from 'react'
import { FaBars, FaBell, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa'
import AdminSidebar from './AdminSidebar'
import { Outlet, Link } from 'react-router-dom'

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const toggleNotification = () => {
    setIsNotificationOpen(!isNotificationOpen)
    setIsProfileOpen(false) // Close profile dropdown if open
  }

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen)
    setIsNotificationOpen(false) // Close notification dropdown if open
  }

  return (
    <div className='min-h-screen flex flex-col md:flex-row  bg-gray-50 relative  '>
      {/** Mobile Toggle Button */}
      <div className='md:hidden flex p-4 bg-gray-900 text-white z-20'>
        <button onClick={toggleSidebar}>
          <FaBars size={24} />
        </button>
        <h1 className='ml-4 text-xl font-semibold'>Admin Dashboard</h1>
      </div>

      {/** Overlay for Mobile Sidebar */}
      {isSidebarOpen && (
        <div
          onClick={toggleSidebar}
          className='fixed inset-0 md:hidden bg-black bg-opacity-50 z-10'
        ></div>
      )}

      {/** Sidebar */}
      <div
        className={`w-64 md:relative transform fixed bg-gray-900 text-white min-h-screen ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-300 md:static md:block z-20`}
      >
        <AdminSidebar />
      </div>

      {/** Main Content */}
      <div className='flex-grow overflow-auto'>
        {/** Navbar */}
        <div className='bg-gray-700  shadow-md p-4  '>
          <div className='flex justify-between items-center'>
            <h1 className='text-xl font-semibold text-white'>Dashboard</h1>
            <div className='flex items-center space-x-4'>
              {/** Notification Button */}
              <div className='relative'>
                <button
                  onClick={toggleNotification}
                  className='bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition-colors relative'
                >
                  <FaBell className='text-gray-700' />
                  {/** Notification Badge */}
                  <span className='absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5'>
                    3
                  </span>
                </button>
                {/** Notification Dropdown */}
                {isNotificationOpen && (
                  <div className='absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg z-30'>
                    <div className='p-4'>
                      <h3 className='text-lg font-semibold text-gray-800'>
                        Notifications
                      </h3>
                      <ul className='mt-2 space-y-2'>
                        <li className='text-sm text-gray-700 hover:bg-gray-100 p-2 rounded-md'>
                          <Link to='/admin/notifications/1'>
                            New order received
                          </Link>
                        </li>
                        <li className='text-sm text-gray-700 hover:bg-gray-100 p-2 rounded-md'>
                          <Link to='/admin/notifications/2'>
                            Payment successful
                          </Link>
                        </li>
                        <li className='text-sm text-gray-700 hover:bg-gray-100 p-2 rounded-md'>
                          <Link to='/admin/notifications/3'>
                            New user registered
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/** User Avatar Dropdown */}
              <div className='relative'>
                <button
                  onClick={toggleProfile}
                  className='bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition-colors'
                >
                  <img
                    src='https://picsum.photos/id/204/800'
                    alt='User Avatar'
                    className='w-8 h-8 rounded-full'
                  />
                </button>
                {/** Profile Dropdown */}
                {isProfileOpen && (
                  <div className='absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-30'>
                    <div className='p-4'>
                      <ul className='space-y-2'>
                        <li className='text-sm text-gray-700 hover:bg-gray-100 p-2 rounded-md'>
                          <Link
                            to='/admin/profile'
                            className='flex items-center space-x-2'
                          >
                            <FaUser />
                            <span>Profile</span>
                          </Link>
                        </li>
                        <li className='text-sm text-gray-700 hover:bg-gray-100 p-2 rounded-md'>
                          <Link
                            to='/admin/settings'
                            className='flex items-center space-x-2'
                          >
                            <FaCog />
                            <span>Settings</span>
                          </Link>
                        </li>
                        <li className='text-sm text-gray-700 hover:bg-gray-100 p-2 rounded-md'>
                          <button
                            onClick={() => {
                              // Handle logout logic here
                              console.log('Logout clicked')
                            }}
                            className='flex items-center space-x-2 w-full text-left'
                          >
                            <FaSignOutAlt />
                            <span>Logout</span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/** Outlet for Pages */}

        <div className='container mx-auto overflow-auto '>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AdminLayout
