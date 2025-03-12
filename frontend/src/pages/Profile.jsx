import UsersOrdersPage from './UsersOrdersPage'
import { FaUser, FaHistory, FaHeart, FaCog, FaSignOutAlt } from 'react-icons/fa' // Icons

const Profile = () => {
  return (
    <div className='min-h-screen flex flex-col bg-gradient-to-r from-green-50 to-green-100'>
      <div className='flex-grow container mx-auto p-4 md:p-6'>
        <div className='flex flex-col md:flex-row space-y-6 md:space-x-6 md:space-y-0'>
          {/** Left Section */}
          <div className='w-full md:w-1/3 lg:w-1/4 bg-white shadow-lg rounded-lg p-6'>
            {/** User Profile Section */}
            <div className='text-center mb-6'>
              <div className='w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden'>
                <img
                  src='https://via.placeholder.com/150'
                  alt='Profile'
                  className='w-full h-full object-cover'
                />
              </div>
              <h1 className='text-2xl font-semibold md:text-3xl mb-2'>
                Romeo Mukulah
              </h1>
              <p className='text-lg text-gray-700 mb-4'>
                romeomukulah@gmail.com
              </p>
            </div>

            {/** Quick Links */}
            <div className='space-y-4 mb-6'>
              <button className='w-full flex items-center space-x-3 p-3 text-gray-700 hover:bg-green-50 rounded-lg transition-all'>
                <FaUser className='text-xl' />
                <span className='text-lg'>Profile</span>
              </button>
              <button className='w-full flex items-center space-x-3 p-3 text-gray-700 hover:bg-green-50 rounded-lg transition-all'>
                <FaHistory className='text-xl' />
                <span className='text-lg'>Order History</span>
              </button>
              <button className='w-full flex items-center space-x-3 p-3 text-gray-700 hover:bg-green-50 rounded-lg transition-all'>
                <FaHeart className='text-xl' />
                <span className='text-lg'>Wishlist</span>
              </button>
              <button className='w-full flex items-center space-x-3 p-3 text-gray-700 hover:bg-green-50 rounded-lg transition-all'>
                <FaCog className='text-xl' />
                <span className='text-lg'>Settings</span>
              </button>
            </div>

            {/** Order Summary */}
            <div className='mb-6'>
              <h2 className='text-xl font-semibold mb-4'>Order Summary</h2>
              <div className='space-y-3'>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Total Orders</span>
                  <span className='font-semibold'>12</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Pending Orders</span>
                  <span className='font-semibold'>2</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Completed Orders</span>
                  <span className='font-semibold'>10</span>
                </div>
              </div>
            </div>

            {/** Logout Button */}
            <button className='w-full flex items-center justify-center space-x-3 p-3 bg-defaul-button-colors hover:bg-defaul-button-colors-hover text-white rounded-lg transition-all'>
              <FaSignOutAlt className='text-xl' />
              <span className='text-lg'>Logout</span>
            </button>
          </div>

          {/** Right Section: Orders Table */}
          <div className='w-full md:w-2/3 lg:w-3/4'>
            <UsersOrdersPage />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
