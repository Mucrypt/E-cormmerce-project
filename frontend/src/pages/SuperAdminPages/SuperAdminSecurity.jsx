import {
  FaShieldAlt,
  FaLock,
  FaUserShield,
  FaEye,
  FaEyeSlash,
  FaHistory,
} from 'react-icons/fa'
import { useState } from 'react'

const securityEvents = [
  {
    id: 1,
    type: 'Failed Login',
    ip: '192.168.1.45',
    user: 'admin@example.com',
    time: '2023-05-20 14:23:10',
  },
  {
    id: 2,
    type: 'Password Changed',
    ip: '10.0.0.2',
    user: 'superadmin@example.com',
    time: '2023-05-20 12:10:45',
  },
  {
    id: 3,
    type: 'Brute Force Attempt',
    ip: '45.33.12.89',
    user: 'N/A',
    time: '2023-05-20 10:05:22',
  },
  {
    id: 4,
    type: 'New Device Login',
    ip: '172.16.0.3',
    user: 'manager@example.com',
    time: '2023-05-20 09:15:33',
  },
]

const SuperAdminSecurity = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  return (
    <div className='bg-white rounded-lg shadow-md p-6 overflow-y-auto max-h-[calc(100vh-200px)]'>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-6'>
        <h2 className='text-2xl font-bold text-gray-800 flex items-center'>
          <FaShieldAlt className='mr-2 text-superadmin-600' />
          Security Center
        </h2>
        <div className='flex space-x-3 mt-3 md:mt-0'>
          <button className='border border-gray-300 hover:bg-gray-100 px-4 py-2 rounded-md'>
            Run Security Scan
          </button>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
        <div className='bg-gray-50 p-4 rounded-lg'>
          <div className='flex items-center'>
            <div className='p-3 rounded-full bg-green-100 text-green-600 mr-4'>
              <FaLock className='text-xl' />
            </div>
            <div>
              <h3 className='text-sm font-medium text-gray-500'>
                Security Level
              </h3>
              <p className='text-2xl font-semibold text-gray-900'>High</p>
            </div>
          </div>
        </div>
        <div className='bg-gray-50 p-4 rounded-lg'>
          <div className='flex items-center'>
            <div className='p-3 rounded-full bg-blue-100 text-blue-600 mr-4'>
              <FaUserShield className='text-xl' />
            </div>
            <div>
              <h3 className='text-sm font-medium text-gray-500'>Last Scan</h3>
              <p className='text-2xl font-semibold text-gray-900'>Today</p>
            </div>
          </div>
        </div>
        <div className='bg-gray-50 p-4 rounded-lg'>
          <div className='flex items-center'>
            <div className='p-3 rounded-full bg-yellow-100 text-yellow-600 mr-4'>
              <FaShieldAlt className='text-xl' />
            </div>
            <div>
              <h3 className='text-sm font-medium text-gray-500'>
                Threats Detected
              </h3>
              <p className='text-2xl font-semibold text-gray-900'>2</p>
            </div>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-8'>
        <div>
          <h3 className='text-lg font-medium text-gray-900 mb-4'>
            Change Password
          </h3>
          <div className='bg-gray-50 p-6 rounded-lg'>
            <div className='space-y-4'>
              <div>
                <label
                  htmlFor='currentPassword'
                  className='block text-sm font-medium text-gray-700'
                >
                  Current Password
                </label>
                <div className='mt-1 relative rounded-md shadow-sm'>
                  <input
                    id='currentPassword'
                    name='currentPassword'
                    type={showPassword ? 'text' : 'password'}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className='block w-full pr-10 border-gray-300 focus:ring-superadmin-500 focus:border-superadmin-500 sm:text-sm rounded-md'
                  />
                  <div className='absolute inset-y-0 right-0 pr-3 flex items-center'>
                    <button
                      type='button'
                      onClick={() => setShowPassword(!showPassword)}
                      className='text-gray-400 hover:text-gray-500'
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor='newPassword'
                  className='block text-sm font-medium text-gray-700'
                >
                  New Password
                </label>
                <div className='mt-1 relative rounded-md shadow-sm'>
                  <input
                    id='newPassword'
                    name='newPassword'
                    type={showPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className='block w-full pr-10 border-gray-300 focus:ring-superadmin-500 focus:border-superadmin-500 sm:text-sm rounded-md'
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor='confirmPassword'
                  className='block text-sm font-medium text-gray-700'
                >
                  Confirm New Password
                </label>
                <div className='mt-1 relative rounded-md shadow-sm'>
                  <input
                    id='confirmPassword'
                    name='confirmPassword'
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className='block w-full pr-10 border-gray-300 focus:ring-superadmin-500 focus:border-superadmin-500 sm:text-sm rounded-md'
                  />
                </div>
              </div>

              <div className='pt-2'>
                <button
                  type='button'
                  className='w-full bg-superadmin-600 hover:bg-superadmin-700 text-white py-2 px-4 rounded-md'
                >
                  Update Password
                </button>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className='text-lg font-medium text-gray-900 mb-4'>
            Recent Security Events
          </h3>
          <div className='bg-gray-50 p-6 rounded-lg'>
            <div className='space-y-4'>
              {securityEvents.map((event) => (
                <div
                  key={event.id}
                  className='border-b border-gray-200 pb-4 last:border-0 last:pb-0'
                >
                  <div className='flex justify-between'>
                    <span className='font-medium'>{event.type}</span>
                    <span className='text-sm text-gray-500'>{event.time}</span>
                  </div>
                  <div className='text-sm text-gray-600 mt-1'>
                    <span className='font-mono'>{event.ip}</span> • {event.user}
                  </div>
                </div>
              ))}
              <div className='pt-2'>
                <button className='text-sm text-superadmin-600 hover:text-superadmin-700 flex items-center'>
                  <FaHistory className='mr-1' />
                  View All Events
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className='text-lg font-medium text-gray-900 mb-4'>
          Security Recommendations
        </h3>
        <div className='bg-gray-50 p-6 rounded-lg'>
          <ul className='space-y-3 list-disc pl-5'>
            <li className='text-sm text-gray-700'>
              <span className='font-medium'>
                Enable Two-Factor Authentication:
              </span>{' '}
              Add an extra layer of security to all admin accounts.
            </li>
            <li className='text-sm text-gray-700'>
              <span className='font-medium'>
                Update Server SSL Certificate:
              </span>{' '}
              Your certificate will expire in 23 days.
            </li>
            <li className='text-sm text-gray-700'>
              <span className='font-medium'>Review Admin Permissions:</span> 3
              admin accounts have excessive permissions.
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SuperAdminSecurity
