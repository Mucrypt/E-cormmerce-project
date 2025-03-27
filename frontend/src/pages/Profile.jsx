import { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  FaUser,
  FaHistory,
  FaHeart,
  FaCog,
  FaSignOutAlt,
  FaEdit,
  FaSpinner,
  FaTimes,
  FaCheck,
} from 'react-icons/fa'
import { toast } from 'react-toastify'
import UsersOrdersPage from './UsersOrdersPage'
import { logout, updateProfile } from '../redux/slices/authSlice'

// Constants
const DEFAULT_AVATAR = 'https://i.pravatar.cc/300'
const AVATAR_SIZE = 96

const Profile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, loading: authLoading } = useSelector((state) => state.auth)

  // State management
  const [editMode, setEditMode] = useState(false)
  const [activeTab, setActiveTab] = useState('orders')
  const [isUpdating, setIsUpdating] = useState(false)
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    avatar: DEFAULT_AVATAR,
  })

  // Order stats with mock data (replace with real API call)
  const [orderStats] = useState({
    total: 5,
    pending: 2,
    completed: 3,
  })

  // Memoized data loading
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        avatar: user.avatar || DEFAULT_AVATAR,
      })
    }
  }, [user])

  // Profile update handler
  const handleProfileUpdate = useCallback(async () => {
    if (!user?._id) return

    setIsUpdating(true)
    try {
      await dispatch(
        updateProfile({
          userId: user._id,
          updates: profileData,
        })
      ).unwrap()

      toast.success('Profile updated successfully')
      setEditMode(false)
    } catch (err) {
      toast.error(err.message || 'Failed to update profile')
    } finally {
      setIsUpdating(false)
    }
  }, [dispatch, profileData, user?._id])

  // Logout handler
  const handleLogout = useCallback(() => {
    dispatch(logout())
    navigate('/login')
    toast.success('Logged out successfully')
  }, [dispatch, navigate])

  // Input change handler
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }, [])

  // Avatar upload handler with validation
  const handleAvatarUpload = useCallback((e) => {
    const file = e.target.files[0]
    if (!file) return

    // Validate file type and size
    if (!file.type.match('image.*')) {
      toast.error('Please select an image file')
      return
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image size should be less than 2MB')
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      setProfileData((prev) => ({
        ...prev,
        avatar: reader.result,
      }))
    }
    reader.onerror = () => {
      toast.error('Error reading image file')
    }
    reader.readAsDataURL(file)
  }, [])

  // Reset form handler
  const resetForm = useCallback(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        avatar: user.avatar || DEFAULT_AVATAR,
      })
    }
    setEditMode(false)
  }, [user])

  // Loading state
  if (authLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gradient-to-r from-green-50 to-green-100'>
        <FaSpinner className='animate-spin text-4xl text-blue-500' />
      </div>
    )
  }

  // Main render
  return (
    <div className='min-h-screen flex flex-col bg-gradient-to-r from-green-50 to-green-100'>
      <div className='flex-grow container mx-auto p-4 md:p-6'>
        <div className='flex flex-col md:flex-row gap-6'>
          {/* Left Section - Profile Sidebar */}
          <div className='w-full md:w-1/3 lg:w-1/4 bg-white shadow-lg rounded-lg p-6'>
            {/* User Profile Section */}
            <div className='text-center mb-6 relative'>
              <div className='relative mx-auto mb-4'>
                <div
                  className={`rounded-full overflow-hidden ${
                    editMode ? 'ring-2 ring-blue-500' : ''
                  }`}
                  style={{ width: AVATAR_SIZE, height: AVATAR_SIZE }}
                >
                  <img
                    src={profileData.avatar}
                    alt='Profile'
                    className='w-full h-full object-cover'
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.src = DEFAULT_AVATAR
                    }}
                  />
                </div>
                {editMode && (
                  <label className='absolute -bottom-2 -right-2 bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600 transition-colors'>
                    <FaEdit />
                    <input
                      type='file'
                      accept='image/*'
                      onChange={handleAvatarUpload}
                      className='hidden'
                    />
                  </label>
                )}
              </div>

              {editMode ? (
                <div className='space-y-3'>
                  <input
                    type='text'
                    name='name'
                    value={profileData.name}
                    onChange={handleInputChange}
                    className='w-full p-2 border rounded-lg text-center text-xl font-semibold focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    placeholder='Full Name'
                    required
                  />
                  <input
                    type='email'
                    name='email'
                    value={profileData.email}
                    onChange={handleInputChange}
                    className='w-full p-2 border rounded-lg text-center text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    placeholder='Email Address'
                    required
                  />
                </div>
              ) : (
                <>
                  <h1 className='text-2xl font-semibold md:text-3xl mb-2 truncate'>
                    {user?.name || 'Guest User'}
                  </h1>
                  <p className='text-lg text-gray-700 mb-4 truncate'>
                    {user?.email || 'No email provided'}
                  </p>
                  <button
                    onClick={() => setEditMode(true)}
                    className='text-blue-500 hover:text-blue-700 flex items-center justify-center gap-1 mx-auto transition-colors'
                  >
                    <FaEdit /> Edit Profile
                  </button>
                </>
              )}
            </div>

            {/* Navigation Tabs */}
            <div className='space-y-2 mb-6'>
              {[
                { id: 'profile', icon: <FaUser />, label: 'Profile' },
                { id: 'orders', icon: <FaHistory />, label: 'Orders' },
                { id: 'wishlist', icon: <FaHeart />, label: 'Wishlist' },
                { id: 'settings', icon: <FaCog />, label: 'Settings' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                    activeTab === tab.id
                      ? 'bg-green-100 text-green-800 font-medium'
                      : 'text-gray-700 hover:bg-green-50'
                  }`}
                >
                  <span className='text-lg'>{tab.icon}</span>
                  <span className='text-lg'>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Order Summary */}
            <div className='mb-6'>
              <h2 className='text-xl font-semibold mb-4'>Order Summary</h2>
              <div className='space-y-3'>
                {[
                  { label: 'Total Orders', value: orderStats.total },
                  { label: 'Pending', value: orderStats.pending },
                  { label: 'Completed', value: orderStats.completed },
                ].map((stat) => (
                  <div key={stat.label} className='flex justify-between'>
                    <span className='text-gray-600'>{stat.label}</span>
                    <span className='font-semibold'>{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className='space-y-3'>
              {editMode && (
                <div className='flex gap-3'>
                  <button
                    onClick={resetForm}
                    className='flex-1 flex items-center justify-center gap-2 p-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors'
                  >
                    <FaTimes /> Cancel
                  </button>
                  <button
                    onClick={handleProfileUpdate}
                    disabled={isUpdating}
                    className='flex-1 flex items-center justify-center gap-2 p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-70'
                  >
                    {isUpdating ? (
                      <FaSpinner className='animate-spin' />
                    ) : (
                      <FaCheck />
                    )}
                    Save
                  </button>
                </div>
              )}

              <button
                onClick={handleLogout}
                className='w-full flex items-center justify-center gap-2 p-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors'
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </div>
          </div>

          {/* Right Section: Content Area */}
          <div className='w-full md:w-2/3 lg:w-3/4'>
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className='bg-white shadow-lg rounded-lg p-6'>
                <h2 className='text-2xl font-semibold mb-6'>
                  Profile Information
                </h2>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Full Name
                    </label>
                    <p className='text-gray-900 p-2 bg-gray-50 rounded-lg'>
                      {user?.name || 'Not provided'}
                    </p>
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Email Address
                    </label>
                    <p className='text-gray-900 p-2 bg-gray-50 rounded-lg'>
                      {user?.email || 'Not provided'}
                    </p>
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Account Created
                    </label>
                    <p className='text-gray-900 p-2 bg-gray-50 rounded-lg'>
                      {user?.createdAt
                        ? new Date(user.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })
                        : 'Unknown'}
                    </p>
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Last Updated
                    </label>
                    <p className='text-gray-900 p-2 bg-gray-50 rounded-lg'>
                      {user?.updatedAt
                        ? new Date(user.updatedAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })
                        : 'Unknown'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && <UsersOrdersPage />}

            {/* Wishlist Tab */}
            {activeTab === 'wishlist' && (
              <div className='bg-white shadow-lg rounded-lg p-6'>
                <h2 className='text-2xl font-semibold mb-6'>Your Wishlist</h2>
                <div className='text-center py-10'>
                  <FaHeart className='mx-auto text-4xl text-gray-300 mb-4' />
                  <p className='text-gray-500 text-lg'>
                    Your saved items will appear here
                  </p>
                  <button className='mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'>
                    Browse Products
                  </button>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className='bg-white shadow-lg rounded-lg p-6'>
                <h2 className='text-2xl font-semibold mb-6'>
                  Account Settings
                </h2>
                <div className='space-y-6'>
                  {/* Password Change */}
                  <div className='bg-gray-50 p-4 rounded-lg'>
                    <h3 className='text-lg font-medium mb-3'>
                      Change Password
                    </h3>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                          Current Password
                        </label>
                        <input
                          type='password'
                          placeholder='••••••••'
                          className='w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                        />
                      </div>
                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                          New Password
                        </label>
                        <input
                          type='password'
                          placeholder='••••••••'
                          className='w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                        />
                      </div>
                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                          Confirm New Password
                        </label>
                        <input
                          type='password'
                          placeholder='••••••••'
                          className='w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                        />
                      </div>
                      <div className='flex items-end'>
                        <button className='w-full md:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'>
                          Update Password
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Notification Preferences */}
                  <div className='bg-gray-50 p-4 rounded-lg'>
                    <h3 className='text-lg font-medium mb-3'>
                      Notification Preferences
                    </h3>
                    <div className='space-y-3'>
                      <label className='flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg cursor-pointer'>
                        <input
                          type='checkbox'
                          className='rounded text-blue-600 focus:ring-blue-500'
                          defaultChecked
                        />
                        <span>Email Notifications</span>
                      </label>
                      <label className='flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg cursor-pointer'>
                        <input
                          type='checkbox'
                          className='rounded text-blue-600 focus:ring-blue-500'
                          defaultChecked
                        />
                        <span>Promotional Offers</span>
                      </label>
                      <label className='flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg cursor-pointer'>
                        <input
                          type='checkbox'
                          className='rounded text-blue-600 focus:ring-blue-500'
                        />
                        <span>SMS Notifications</span>
                      </label>
                      <div className='pt-2'>
                        <button className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'>
                          Save Preferences
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Account Actions */}
                  <div className='bg-red-50 p-4 rounded-lg border border-red-100'>
                    <h3 className='text-lg font-medium mb-3 text-red-800'>
                      Account Actions
                    </h3>
                    <div className='space-y-3'>
                      <button className='w-full text-left p-3 bg-white hover:bg-red-50 text-red-600 rounded-lg border border-red-200 transition-colors'>
                        Request Data Export
                      </button>
                      <button className='w-full text-left p-3 bg-white hover:bg-red-50 text-red-600 rounded-lg border border-red-200 transition-colors'>
                        Deactivate Account
                      </button>
                      <button className='w-full text-left p-3 bg-white hover:bg-red-50 text-red-600 rounded-lg border border-red-200 transition-colors'>
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
