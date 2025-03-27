import { useState, useEffect } from 'react'
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaSpinner,

  FaChartBar,
} from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
  toggleUserStatus,
  changeUserRole,
  fetchUserStats,
} from '../../redux/slices/adminSlice'

const AdminUsersPage = () => {
  const dispatch = useDispatch()
  const { users, userStats, loading, error } = useSelector(
    (state) => state.admin
  )

  // State for modals and forms
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false)
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false)
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)

  // Form states
  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'customer',
  })
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    role: 'customer',
  })

  // Fetch data on component mount
  useEffect(() => {
    dispatch(fetchUsers())
    dispatch(fetchUserStats())
  }, [dispatch])

  // Handle errors
  useEffect(() => {
    if (error) {
      toast.error(error)
    }
  }, [error])

  // Form handlers
  const handleUserFormChange = (e) => {
    const { name, value } = e.target
    setUserForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleEditFormChange = (e) => {
    const { name, value } = e.target
    setEditForm((prev) => ({ ...prev, [name]: value }))
  }

  // Open edit modal with user data
  const openEditModal = (user) => {
    setSelectedUser(user)
    setEditForm({
      name: user.name,
      email: user.email,
      role: user.role,
    })
    setIsEditUserModalOpen(true)
  }

  // API operations
  const handleAddUser = async () => {
    if (!userForm.name || !userForm.email || !userForm.password) {
      toast.error('Please fill all required fields')
      return
    }

    try {
      await dispatch(createUser(userForm)).unwrap()
      toast.success('User created successfully')
      setIsAddUserModalOpen(false)
      setUserForm({ name: '', email: '', password: '', role: 'customer' })
    } catch (err) {
      console.error('Failed to create user:', err)
    }
  }

  const handleUpdateUser = async () => {
    if (!selectedUser) return

    try {
      await dispatch(
        updateUser({
          userId: selectedUser._id,
          ...editForm,
        })
      ).unwrap()
      toast.success('User updated successfully')
      setIsEditUserModalOpen(false)
    } catch (err) {
      console.error('Failed to update user:', err)
    }
  }

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await dispatch(deleteUser(userId)).unwrap()
        toast.success('User deleted successfully')
      } catch (err) {
        console.error('Failed to delete user:', err)
      }
    }
  }

  const handleToggleStatus = async (userId) => {
    try {
      await dispatch(toggleUserStatus(userId)).unwrap()
      toast.success('User status updated')
    } catch (err) {
      console.error('Failed to toggle user status:', err)
    }
  }

  const handleChangeRole = async (userId, newRole) => {
    try {
      await dispatch(changeUserRole({ userId, role: newRole })).unwrap()
      toast.success('User role updated')
    } catch (err) {
      console.error('Failed to change user role:', err)
    }
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='flex justify-between items-center mb-8'>
        <h1 className='text-3xl font-bold text-gray-800'>User Management</h1>
        <div className='flex space-x-4'>
          <button
            onClick={() => setIsStatsModalOpen(true)}
            className='flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded'
          >
            <FaChartBar /> Stats
          </button>
          <button
            onClick={() => setIsAddUserModalOpen(true)}
            className='flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded'
          >
            <FaPlus /> Add User
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className='bg-white rounded-lg shadow overflow-x-auto'>
        {loading ? (
          <div className='p-8 flex justify-center'>
            <FaSpinner className='animate-spin text-2xl text-blue-500' />
          </div>
        ) : error ? (
          <div className='p-4 text-red-500'>{error}</div>
        ) : users.length === 0 ? (
          <div className='p-4 text-gray-500'>No users found</div>
        ) : (
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
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {users.map((user) => (
                <tr key={user._id} className='hover:bg-gray-50'>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm font-medium text-gray-900'>
                      {user.name}
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm text-gray-500'>{user.email}</div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <select
                      value={user.role}
                      onChange={(e) =>
                        handleChangeRole(user._id, e.target.value)
                      }
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        user.role === 'admin'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      <option value='customer'>Customer</option>
                      <option value='admin'>Admin</option>
                    </select>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <button
                      onClick={() => handleToggleStatus(user._id)}
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        user.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {user.isActive ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                    <div className='flex space-x-2'>
                      <button
                        onClick={() => openEditModal(user)}
                        className='text-indigo-600 hover:text-indigo-900'
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className='text-red-600 hover:text-red-900'
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Add User Modal */}
      {isAddUserModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
          <div className='bg-white rounded-lg shadow-xl w-full max-w-md'>
            <div className='p-6'>
              <div className='flex justify-between items-center mb-4'>
                <h2 className='text-xl font-semibold text-gray-800'>
                  Add New User
                </h2>
                <button
                  onClick={() => setIsAddUserModalOpen(false)}
                  className='text-gray-400 hover:text-gray-500'
                >
                  &times;
                </button>
              </div>

              <div className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Name
                  </label>
                  <input
                    type='text'
                    name='name'
                    value={userForm.name}
                    onChange={handleUserFormChange}
                    className='w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
                    placeholder='Full name'
                    required
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Email
                  </label>
                  <input
                    type='email'
                    name='email'
                    value={userForm.email}
                    onChange={handleUserFormChange}
                    className='w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
                    placeholder='Email address'
                    required
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Password
                  </label>
                  <input
                    type='password'
                    name='password'
                    value={userForm.password}
                    onChange={handleUserFormChange}
                    className='w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
                    placeholder='Password'
                    required
                    minLength={6}
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Role
                  </label>
                  <select
                    name='role'
                    value={userForm.role}
                    onChange={handleUserFormChange}
                    className='w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
                  >
                    <option value='customer'>Customer</option>
                    <option value='admin'>Admin</option>
                  </select>
                </div>
              </div>

              <div className='mt-6 flex justify-end space-x-3'>
                <button
                  onClick={() => setIsAddUserModalOpen(false)}
                  className='px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50'
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddUser}
                  className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'
                >
                  Add User
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {isEditUserModalOpen && selectedUser && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
          <div className='bg-white rounded-lg shadow-xl w-full max-w-md'>
            <div className='p-6'>
              <div className='flex justify-between items-center mb-4'>
                <h2 className='text-xl font-semibold text-gray-800'>
                  Edit User
                </h2>
                <button
                  onClick={() => setIsEditUserModalOpen(false)}
                  className='text-gray-400 hover:text-gray-500'
                >
                  &times;
                </button>
              </div>

              <div className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Name
                  </label>
                  <input
                    type='text'
                    name='name'
                    value={editForm.name}
                    onChange={handleEditFormChange}
                    className='w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
                    required
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Email
                  </label>
                  <input
                    type='email'
                    name='email'
                    value={editForm.email}
                    onChange={handleEditFormChange}
                    className='w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
                    required
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Role
                  </label>
                  <select
                    name='role'
                    value={editForm.role}
                    onChange={handleEditFormChange}
                    className='w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
                  >
                    <option value='customer'>Customer</option>
                    <option value='admin'>Admin</option>
                  </select>
                </div>
              </div>

              <div className='mt-6 flex justify-end space-x-3'>
                <button
                  onClick={() => setIsEditUserModalOpen(false)}
                  className='px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50'
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateUser}
                  className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats Modal */}
      {isStatsModalOpen && userStats && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
          <div className='bg-white rounded-lg shadow-xl w-full max-w-md'>
            <div className='p-6'>
              <div className='flex justify-between items-center mb-4'>
                <h2 className='text-xl font-semibold text-gray-800'>
                  User Statistics
                </h2>
                <button
                  onClick={() => setIsStatsModalOpen(false)}
                  className='text-gray-400 hover:text-gray-500'
                >
                  &times;
                </button>
              </div>

              <div className='space-y-4'>
                <div className='bg-blue-50 p-4 rounded-lg'>
                  <h3 className='text-lg font-medium text-blue-800'>
                    Total Users
                  </h3>
                  <p className='text-3xl font-bold text-blue-600'>
                    {userStats.totalUsers}
                  </p>
                </div>

                <div className='bg-green-50 p-4 rounded-lg'>
                  <h3 className='text-lg font-medium text-green-800'>
                    Active Users
                  </h3>
                  <p className='text-3xl font-bold text-green-600'>
                    {userStats.activeUsers}
                  </p>
                </div>

                <div className='bg-purple-50 p-4 rounded-lg'>
                  <h3 className='text-lg font-medium text-purple-800'>
                    Admin Users
                  </h3>
                  <p className='text-3xl font-bold text-purple-600'>
                    {userStats.admins}
                  </p>
                </div>
              </div>

              <div className='mt-6 flex justify-end'>
                <button
                  onClick={() => setIsStatsModalOpen(false)}
                  className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminUsersPage
