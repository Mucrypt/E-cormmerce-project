import { useState, useEffect } from 'react'
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa'

const AdminUsersPage = () => {
  // State for users
  const [users, setUsers] = useState([])

  // State for the add user modal
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false)

  // State for the edit user role modal
  const [isEditRoleModalOpen, setIsEditRoleModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)

  // State for the add user form
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Customer', // Default role
  })

  // Fetch users from the backend
  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users')
      const data = await response.json()
      setUsers(data)
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  // Open the add user modal
  const openAddUserModal = () => {
    setIsAddUserModalOpen(true)
  }

  // Close the add user modal
  const closeAddUserModal = () => {
    setIsAddUserModalOpen(false)
    setFormData({ name: '', email: '', password: '', role: 'Customer' }) // Reset form
  }

  // Open the edit role modal
  const openEditRoleModal = (user) => {
    setSelectedUser(user)
    setIsEditRoleModalOpen(true)
  }

  // Close the edit role modal
  const closeEditRoleModal = () => {
    setIsEditRoleModalOpen(false)
    setSelectedUser(null) // Reset selected user
  }

  // Handle input changes for the add user form
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  // Handle adding a new user
  const handleAddUser = async () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.role
    ) {
      alert('Please fill in all fields.')
      return
    }

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const newUser = await response.json()
      setUsers([...users, newUser])
      closeAddUserModal()
    } catch (error) {
      console.error('Error adding user:', error)
    }
  }

  // Handle updating user role
  const handleUpdateRole = async (newRole) => {
    if (!selectedUser) return

    try {
      const response = await fetch(`/api/users/${selectedUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole }),
      })
      const updatedUser = await response.json()
      const updatedUsers = users.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      )
      setUsers(updatedUsers)
      closeEditRoleModal()
    } catch (error) {
      console.error('Error updating user role:', error)
    }
  }

  // Handle deleting a user
  const handleDeleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await fetch(`/api/users/${id}`, { method: 'DELETE' })
        setUsers(users.filter((user) => user.id !== id))
      } catch (error) {
        console.error('Error deleting user:', error)
      }
    }
  }

  return (
    <div className='p-6 bg-gray-50 min-h-screen'>
      <h1 className='text-2xl font-semibold mb-6 text-gray-800'>
        Manage Users
      </h1>
      <div className='bg-white p-6 rounded-lg shadow-md'>
        <div className='flex justify-end mb-4'>
          <button
            onClick={openAddUserModal}
            className='bg-defaul-button-colors text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-red-500 transition-colors'
          >
            <FaPlus />
            <span>Add User</span>
          </button>
        </div>
        <table className='w-full'>
          <thead>
            <tr className='bg-gray-100 text-gray-700'>
              <th className='text-left p-3'>Name</th>
              <th className='text-left p-3'>Email</th>
              <th className='text-left p-3'>Role</th>
              <th className='text-left p-3'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className='border-b hover:bg-gray-50 transition-colors'
              >
                <td className='p-3 text-gray-700'>{user.name}</td>
                <td className='p-3 text-gray-700'>{user.email}</td>
                <td className='p-3 text-gray-700'>{user.role}</td>
                <td className='p-3 flex space-x-2'>
                  <button
                    onClick={() => openEditRoleModal(user)}
                    className='text-blue-500 hover:text-blue-700 transition-colors'
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className='text-red-500 hover:text-red-700 transition-colors'
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/** Add User Modal */}
      {isAddUserModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white p-6 rounded-lg shadow-xl w-full max-w-md'>
            <h2 className='text-xl font-semibold mb-4 text-gray-800'>
              Add User
            </h2>
            <div className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Name
                </label>
                <input
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleInputChange}
                  className='w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='Enter name'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Email
                </label>
                <input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleInputChange}
                  className='w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='Enter email'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Password
                </label>
                <input
                  type='password'
                  name='password'
                  value={formData.password}
                  onChange={handleInputChange}
                  className='w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='Enter password'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Role
                </label>
                <select
                  name='role'
                  value={formData.role}
                  onChange={handleInputChange}
                  className='w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                >
                  <option value='Admin'>Admin</option>
                  <option value='Customer'>Customer</option>
                </select>
              </div>
              <div className='flex justify-end space-x-4'>
                <button
                  onClick={closeAddUserModal}
                  className='bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors'
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddUser}
                  className='bg-defaul-button-colors text-white px-4 py-2 rounded-md hover:bg-red-500 transition-colors'
                >
                  Add User
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/** Edit Role Modal */}
      {isEditRoleModalOpen && selectedUser && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white p-6 rounded-lg shadow-xl w-full max-w-md'>
            <h2 className='text-xl font-semibold mb-4 text-gray-800'>
              Edit User Role
            </h2>
            <div className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Current Role
                </label>
                <p className='text-gray-700'>{selectedUser.role}</p>
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  New Role
                </label>
                <select
                  onChange={(e) => handleUpdateRole(e.target.value)}
                  className='w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                >
                  <option value='Admin'>Admin</option>
                  <option value='Customer'>Customer</option>
                </select>
              </div>
              <div className='flex justify-end space-x-4'>
                <button
                  onClick={closeEditRoleModal}
                  className='bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors'
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleUpdateRole(selectedUser.role)}
                  className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors'
                >
                  Save Changes
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
