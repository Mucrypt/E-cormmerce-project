import {
  FaKey,
  FaPlus,
  FaTrash,
  FaEdit,
  FaEye,
  FaEyeSlash,
} from 'react-icons/fa'
import { useState } from 'react'

const apiKeys = [
  {
    id: 1,
    name: 'Frontend App',
    key: 'sk_live_1234567890abcdef',
    created: '2023-04-15',
    lastUsed: '2023-05-20',
    active: true,
  },
  {
    id: 2,
    name: 'Mobile App',
    key: 'sk_live_0987654321fedcba',
    created: '2023-03-10',
    lastUsed: '2023-05-18',
    active: true,
  },
  {
    id: 3,
    name: 'Internal Tools',
    key: 'sk_live_a1b2c3d4e5f67890',
    created: '2023-01-22',
    lastUsed: '2023-04-30',
    active: false,
  },
]

const SuperAdminApiManagement = () => {
  const [showKey, setShowKey] = useState(null)
  const [isCreating, setIsCreating] = useState(false)
  const [newKeyName, setNewKeyName] = useState('')
  const [newKeyPermissions, setNewKeyPermissions] = useState({
    read: true,
    write: false,
    delete: false,
  })

  const toggleKeyVisibility = (id) => {
    setShowKey(showKey === id ? null : id)
  }

  const togglePermission = (permission) => {
    setNewKeyPermissions((prev) => ({
      ...prev,
      [permission]: !prev[permission],
    }))
  }

  const handleCreateKey = () => {
    // API key creation logic would go here
    alert(`Creating new key: ${newKeyName}`)
    setIsCreating(false)
    setNewKeyName('')
    setNewKeyPermissions({ read: true, write: false, delete: false })
  }

  return (
    <div className='bg-white rounded-lg shadow-md p-6 overflow-y-auto max-h-[calc(100vh-200px)]'>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-6'>
        <h2 className='text-2xl font-bold text-gray-800 flex items-center'>
          <FaKey className='mr-2 text-superadmin-600' />
          API Management
        </h2>
        <div className='flex space-x-3 mt-3 md:mt-0'>
          <button
            onClick={() => setIsCreating(true)}
            className='bg-superadmin-600 hover:bg-superadmin-700 text-white px-4 py-2 rounded-md flex items-center'
          >
            <FaPlus className='mr-2' />
            New API Key
          </button>
        </div>
      </div>

      {isCreating && (
        <div className='mb-8 bg-gray-50 p-6 rounded-lg border border-gray-200'>
          <h3 className='text-lg font-medium text-gray-900 mb-4'>
            Create New API Key
          </h3>
          <div className='space-y-4'>
            <div>
              <label
                htmlFor='keyName'
                className='block text-sm font-medium text-gray-700'
              >
                Key Name
              </label>
              <input
                type='text'
                id='keyName'
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-superadmin-500 focus:border-superadmin-500 sm:text-sm'
                placeholder='e.g. Mobile App Integration'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Permissions
              </label>
              <div className='space-y-2'>
                <div className='flex items-center'>
                  <input
                    id='readPermission'
                    name='readPermission'
                    type='checkbox'
                    checked={newKeyPermissions.read}
                    onChange={() => togglePermission('read')}
                    className='focus:ring-superadmin-500 h-4 w-4 text-superadmin-600 border-gray-300 rounded'
                  />
                  <label
                    htmlFor='readPermission'
                    className='ml-2 block text-sm text-gray-700'
                  >
                    Read Access
                  </label>
                </div>
                <div className='flex items-center'>
                  <input
                    id='writePermission'
                    name='writePermission'
                    type='checkbox'
                    checked={newKeyPermissions.write}
                    onChange={() => togglePermission('write')}
                    className='focus:ring-superadmin-500 h-4 w-4 text-superadmin-600 border-gray-300 rounded'
                  />
                  <label
                    htmlFor='writePermission'
                    className='ml-2 block text-sm text-gray-700'
                  >
                    Write Access
                  </label>
                </div>
                <div className='flex items-center'>
                  <input
                    id='deletePermission'
                    name='deletePermission'
                    type='checkbox'
                    checked={newKeyPermissions.delete}
                    onChange={() => togglePermission('delete')}
                    className='focus:ring-superadmin-500 h-4 w-4 text-superadmin-600 border-gray-300 rounded'
                  />
                  <label
                    htmlFor='deletePermission'
                    className='ml-2 block text-sm text-gray-700'
                  >
                    Delete Access
                  </label>
                </div>
              </div>
            </div>

            <div className='flex space-x-3 pt-2'>
              <button
                onClick={handleCreateKey}
                className='bg-superadmin-600 hover:bg-superadmin-700 text-white px-4 py-2 rounded-md'
              >
                Create Key
              </button>
              <button
                onClick={() => setIsCreating(false)}
                className='border border-gray-300 hover:bg-gray-100 px-4 py-2 rounded-md'
              >
                Cancel
              </button>
            </div>
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
                API Key
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Created
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Last Used
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Status
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {apiKeys.map((apiKey) => (
              <tr key={apiKey.id}>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                  {apiKey.name}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono'>
                  {showKey === apiKey.id ? apiKey.key : '••••••••••••••••'}
                  <button
                    onClick={() => toggleKeyVisibility(apiKey.id)}
                    className='ml-2 text-gray-400 hover:text-gray-600'
                  >
                    {showKey === apiKey.id ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  {apiKey.created}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  {apiKey.lastUsed}
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      apiKey.active
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {apiKey.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                  <button className='text-superadmin-600 hover:text-superadmin-700 mr-3'>
                    <FaEdit />
                  </button>
                  <button className='text-red-600 hover:text-red-700'>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='mt-8 bg-gray-50 p-6 rounded-lg border border-gray-200'>
        <h3 className='text-lg font-medium text-gray-900 mb-4'>
          API Documentation
        </h3>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <div className='border border-gray-200 rounded-lg p-4 hover:border-superadmin-500 transition-colors'>
            <h4 className='font-medium text-gray-900 mb-2'>Authentication</h4>
            <p className='text-sm text-gray-600'>
              Learn how to authenticate with our API using your keys
            </p>
          </div>
          <div className='border border-gray-200 rounded-lg p-4 hover:border-superadmin-500 transition-colors'>
            <h4 className='font-medium text-gray-900 mb-2'>Products API</h4>
            <p className='text-sm text-gray-600'>
              Documentation for managing products through the API
            </p>
          </div>
          <div className='border border-gray-200 rounded-lg p-4 hover:border-superadmin-500 transition-colors'>
            <h4 className='font-medium text-gray-900 mb-2'>Orders API</h4>
            <p className='text-sm text-gray-600'>
              Guide for order management via API endpoints
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SuperAdminApiManagement
