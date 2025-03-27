import {
  FaUserShield,
  FaSearch,
  FaPlus,
  FaEdit,
  FaTrash,
  FaLock,
  FaUnlock,
} from 'react-icons/fa'
import { useState } from 'react'

const adminUsers = [
  {
    id: 1,
    name: 'Super Admin',
    email: 'superadmin@example.com',
    role: 'Super Admin',
    status: 'active',
    lastLogin: '2023-05-20 14:30',
  },
  {
    id: 2,
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'Administrator',
    status: 'active',
    lastLogin: '2023-05-19 09:15',
  },
  {
    id: 3,
    name: 'Content Manager',
    email: 'content@example.com',
    role: 'Content Manager',
    status: 'inactive',
    lastLogin: '2023-05-10 11:45',
  },
  {
    id: 4,
    name: 'Support Admin',
    email: 'support@example.com',
    role: 'Support',
    status: 'active',
    lastLogin: '2023-05-20 08:22',
  },
]

const SuperAdminAdmins = () => {
  const [isCreating, setIsCreating] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredAdmins = adminUsers.filter(
    (admin) =>
      admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className='bg-white rounded-lg shadow-md p-6 overflow-y-auto max-h-[calc(100vh-200px)]'>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-6'>
        <h2 className='text-2xl font-bold text-gray-800 flex items-center'>
          <FaUserShield className='mr-2 text-superadmin-600' />
          Admin Users
        </h2>
        <div className='flex space-x-3 mt-3 md:mt-0'>
          <div className='relative'>
            <FaSearch className='absolute left-3 top-3 text-gray-400' />
            <input
              type='text'
              placeholder='Search admins...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-superadmin-500 focus:border-superadmin-500'
            />
          </div>
          <button
            onClick={() => setIsCreating(true)}
            className='bg-superadmin-600 hover:bg-superadmin-700 text-white px-4 py-2 rounded-md flex items-center'
          >
            <FaPlus className='mr-2' />
            New Admin
          </button>
        </div>
      </div>

      {isCreating && (
        <div className='mb-6 bg-gray-50 p-6 rounded-lg border border-gray-200'>
          <h3 className='text-lg font-medium text-gray-900 mb-4'>
            Create New Admin
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Full Name
              </label>
              <input
                type='text'
                className='w-full border border-gray-300 rounded-md px-3 py-2'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Email
              </label>
              <input
                type='email'
                className='w-full border border-gray-300 rounded-md px-3 py-2'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Role
              </label>
              <select className='w-full border border-gray-300 rounded-md px-3 py-2'>
                <option>Super Admin</option>
                <option>Administrator</option>
                <option>Content Manager</option>
                <option>Support</option>
              </select>
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Initial Password
              </label>
              <input
                type='password'
                className='w-full border border-gray-300 rounded-md px-3 py-2'
              />
            </div>
          </div>
          <div className='flex justify-end space-x-3 mt-6'>
            <button
              onClick={() => setIsCreating(false)}
              className='border border-gray-300 hover:bg-gray-100 px-4 py-2 rounded-md'
            >
              Cancel
            </button>
            <button className='bg-superadmin-600 hover:bg-superadmin-700 text-white px-4 py-2 rounded-md'>
              Create Admin
            </button>
          </div>
        </div>
      )}

      <div className='overflow-x-auto'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Name
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Email
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Role
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Status
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Last Login
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {filteredAdmins.map((admin) => (
              <tr key={admin.id}>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='flex items-center'>
                    <div className='flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center'>
                      <FaUserShield className='text-gray-500' />
                    </div>
                    <div className='ml-4'>
                      <div className='text-sm font-medium text-gray-900'>
                        {admin.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  {admin.email}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  {admin.role}
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      admin.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {admin.status.charAt(0).toUpperCase() +
                      admin.status.slice(1)}
                  </span>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  {admin.lastLogin}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                  <button className='text-superadmin-600 hover:text-superadmin-700 mr-3'>
                    <FaEdit />
                  </button>
                  <button className='text-red-600 hover:text-red-700 mr-3'>
                    <FaTrash />
                  </button>
                  <button className='text-gray-600 hover:text-gray-700'>
                    {admin.status === 'active' ? <FaLock /> : <FaUnlock />}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SuperAdminAdmins
