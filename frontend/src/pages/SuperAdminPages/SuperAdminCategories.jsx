import {
  FaTags,
  FaPlus,
  FaEdit,
  FaTrash,
  FaBox,
  FaChartLine,
} from 'react-icons/fa'
import { useState } from 'react'

const categories = [
  {
    id: 1,
    name: 'Electronics',
    slug: 'electronics',
    products: 42,
    status: 'active',
  },
  {
    id: 2,
    name: 'Clothing',
    slug: 'clothing',
    products: 128,
    status: 'active',
  },
  {
    id: 3,
    name: 'Home & Garden',
    slug: 'home-garden',
    products: 75,
    status: 'active',
  },
  { id: 4, name: 'Toys', slug: 'toys', products: 36, status: 'inactive' },
]

const SuperAdminCategories = () => {
  const [isCreating, setIsCreating] = useState(false)
  const [newCategory, setNewCategory] = useState({
    name: '',
    slug: '',
    status: 'active',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewCategory((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCreateCategory = (e) => {
    e.preventDefault()
    // Category creation logic would go here
    alert(`Creating category: ${newCategory.name}`)
    setIsCreating(false)
    setNewCategory({ name: '', slug: '', status: 'active' })
  }

  return (
    <div className='bg-white rounded-lg shadow-md p-6 overflow-y-auto max-h-[calc(100vh-200px)]'>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-6'>
        <h2 className='text-2xl font-bold text-gray-800 flex items-center'>
          <FaTags className='mr-2 text-superadmin-600' />
          Category Management
        </h2>
        <button
          onClick={() => setIsCreating(true)}
          className='mt-3 md:mt-0 bg-superadmin-600 hover:bg-superadmin-700 text-white px-4 py-2 rounded-md flex items-center'
        >
          <FaPlus className='mr-2' />
          New Category
        </button>
      </div>

      {isCreating && (
        <div className='mb-6 bg-gray-50 p-6 rounded-lg border border-gray-200'>
          <h3 className='text-lg font-medium text-gray-900 mb-4'>
            Create New Category
          </h3>
          <form onSubmit={handleCreateCategory} className='space-y-4'>
            <div>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-gray-700'
              >
                Category Name
              </label>
              <input
                type='text'
                id='name'
                name='name'
                value={newCategory.name}
                onChange={handleInputChange}
                required
                className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-superadmin-500 focus:border-superadmin-500 sm:text-sm'
              />
            </div>
            <div>
              <label
                htmlFor='slug'
                className='block text-sm font-medium text-gray-700'
              >
                URL Slug
              </label>
              <input
                type='text'
                id='slug'
                name='slug'
                value={newCategory.slug}
                onChange={handleInputChange}
                required
                className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-superadmin-500 focus:border-superadmin-500 sm:text-sm'
              />
            </div>
            <div>
              <label
                htmlFor='status'
                className='block text-sm font-medium text-gray-700'
              >
                Status
              </label>
              <select
                id='status'
                name='status'
                value={newCategory.status}
                onChange={handleInputChange}
                className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-superadmin-500 focus:border-superadmin-500 sm:text-sm'
              >
                <option value='active'>Active</option>
                <option value='inactive'>Inactive</option>
              </select>
            </div>
            <div className='flex justify-end space-x-3 pt-2'>
              <button
                onClick={() => setIsCreating(false)}
                className='border border-gray-300 hover:bg-gray-100 px-4 py-2 rounded-md'
              >
                Cancel
              </button>
              <button
                type='submit'
                className='bg-superadmin-600 hover:bg-superadmin-700 text-white px-4 py-2 rounded-md'
              >
                Create Category
              </button>
            </div>
          </form>
        </div>
      )}

      <div className='overflow-x-auto'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Category
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                URL Slug
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Products
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
            {categories.map((category) => (
              <tr key={category.id}>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='flex items-center'>
                    <div className='flex-shrink-0 h-10 w-10 bg-gray-200 rounded-md flex items-center justify-center'>
                      <FaTags className='text-gray-500' />
                    </div>
                    <div className='ml-4'>
                      <div className='text-sm font-medium text-gray-900'>
                        {category.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono'>
                  {category.slug}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  <span className='inline-flex items-center'>
                    <FaBox className='mr-1 text-gray-400' />
                    {category.products}
                  </span>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      category.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {category.status.charAt(0).toUpperCase() +
                      category.status.slice(1)}
                  </span>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                  <button className='text-superadmin-600 hover:text-superadmin-700 mr-3'>
                    <FaEdit />
                  </button>
                  <button className='text-red-600 hover:text-red-700 mr-3'>
                    <FaTrash />
                  </button>
                  <button className='text-gray-600 hover:text-gray-700'>
                    <FaChartLine />
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

export default SuperAdminCategories
