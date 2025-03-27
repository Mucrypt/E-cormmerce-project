import {
  FaUserTag,
  FaPlus,
  FaEdit,
  FaTrash,
  FaUsers,
  FaShieldAlt,
} from 'react-icons/fa'
import { useState } from 'react'

const roles = [
  {
    id: 1,
    name: 'Super Admin',
    description: 'Full system access',
    users: 1,
    permissions: 'All',
  },
  {
    id: 2,
    name: 'Administrator',
    description: 'Manage content and users',
    users: 3,
    permissions: 'Most',
  },
  {
    id: 3,
    name: 'Content Manager',
    description: 'Manage products and categories',
    users: 5,
    permissions: 'Content',
  },
  {
    id: 4,
    name: 'Support',
    description: 'Access to support tools',
    users: 2,
    permissions: 'Limited',
  },
]

const permissions = [
  { name: 'Dashboard', access: ['view'] },
  { name: 'Users', access: ['view', 'create', 'edit', 'delete'] },
  { name: 'Products', access: ['view', 'create', 'edit', 'delete'] },
  { name: 'Orders', access: ['view', 'edit'] },
  { name: 'Content', access: ['view', 'create', 'edit'] },
  { name: 'Settings', access: ['view', 'edit'] },
]

const SuperAdminRoles = () => {
  const [selectedRole, setSelectedRole] = useState(null)
  const [ setIsCreating] = useState(false)

  return (
    <div className='bg-white rounded-lg shadow-md p-6 overflow-y-auto max-h-[calc(100vh-200px)]'>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-6'>
        <h2 className='text-2xl font-bold text-gray-800 flex items-center'>
          <FaUserTag className='mr-2 text-superadmin-600' />
          Roles & Permissions
        </h2>
        <button
          onClick={() => setIsCreating(true)}
          className='mt-3 md:mt-0 bg-superadmin-600 hover:bg-superadmin-700 text-white px-4 py-2 rounded-md flex items-center'
        >
          <FaPlus className='mr-2' />
          New Role
        </button>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        <div className='lg:col-span-1'>
          <div className='bg-gray-50 rounded-lg border border-gray-200 overflow-hidden'>
            <div className='bg-gray-100 px-4 py-3 border-b border-gray-200'>
              <h3 className='font-medium text-gray-900'>System Roles</h3>
            </div>
            <div className='divide-y divide-gray-200'>
              {roles.map((role) => (
                <div
                  key={role.id}
                  onClick={() => setSelectedRole(role)}
                  className={`px-4 py-3 hover:bg-gray-100 cursor-pointer ${
                    selectedRole?.id === role.id ? 'bg-superadmin-50' : ''
                  }`}
                >
                  <div className='flex justify-between items-center'>
                    <div>
                      <h4 className='font-medium text-gray-900'>{role.name}</h4>
                      <p className='text-sm text-gray-500'>
                        {role.description}
                      </p>
                    </div>
                    <div className='flex items-center text-sm text-gray-500'>
                      <FaUsers className='mr-1' />
                      {role.users}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className='lg:col-span-2'>
          {selectedRole ? (
            <div className='bg-white rounded-lg shadow p-6'>
              <div className='flex justify-between items-start mb-6'>
                <div>
                  <h3 className='text-xl font-bold text-gray-800'>
                    {selectedRole.name}
                  </h3>
                  <p className='text-gray-600'>{selectedRole.description}</p>
                </div>
                <div className='flex space-x-2'>
                  <button className='text-superadmin-600 hover:text-superadmin-700 p-2'>
                    <FaEdit />
                  </button>
                  <button className='text-red-600 hover:text-red-700 p-2'>
                    <FaTrash />
                  </button>
                </div>
              </div>

              <div className='mb-6'>
                <h4 className='font-medium text-gray-900 mb-3 flex items-center'>
                  <FaShieldAlt className='mr-2 text-superadmin-600' />
                  Permissions
                </h4>
                <div className='bg-gray-50 rounded-lg p-4'>
                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {permissions.map((permission, index) => (
                      <div
                        key={index}
                        className='border border-gray-200 rounded-md p-3'
                      >
                        <h5 className='font-medium text-gray-900 mb-2'>
                          {permission.name}
                        </h5>
                        <div className='flex flex-wrap gap-2'>
                          {permission.access.map((access, i) => (
                            <span
                              key={i}
                              className='bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded'
                            >
                              {access}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h4 className='font-medium text-gray-900 mb-3'>
                  Users with this role
                </h4>
                <div className='bg-gray-50 rounded-lg p-4'>
                  <p className='text-gray-600'>
                    List of users will be displayed here
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className='bg-gray-50 rounded-lg border border-gray-200 h-full flex items-center justify-center p-8'>
              <div className='text-center'>
                <FaUserTag className='mx-auto text-4xl text-gray-400 mb-4' />
                <h3 className='text-lg font-medium text-gray-900 mb-2'>
                  Select a role
                </h3>
                <p className='text-gray-600'>
                  Choose a role from the list to view and edit its permissions
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SuperAdminRoles
