import {
  FaBox,
  FaSearch,
  FaPlus,
  FaEdit,
  FaTrash,
  FaTags,
  FaEye,
} from 'react-icons/fa'
import { useState } from 'react'

const products = [
  {
    id: 1,
    name: 'Premium T-Shirt',
    sku: 'TSHIRT-PRE',
    price: '$29.99',
    stock: 42,
    category: 'Clothing',
    status: 'published',
  },
  {
    id: 2,
    name: 'Wireless Headphones',
    sku: 'HP-WL-100',
    price: '$99.99',
    stock: 15,
    category: 'Electronics',
    status: 'published',
  },
  {
    id: 3,
    name: 'Leather Wallet',
    sku: 'WALLET-LTH',
    price: '$49.99',
    stock: 28,
    category: 'Accessories',
    status: 'draft',
  },
  {
    id: 4,
    name: 'Stainless Steel Bottle',
    sku: 'BOTTLE-SS',
    price: '$24.99',
    stock: 0,
    category: 'Home',
    status: 'archived',
  },
]

const SuperAdminProducts = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')

  const filteredProducts = products.filter((product) => {
    if (selectedCategory !== 'all' && product.category !== selectedCategory)
      return false
    if (selectedStatus !== 'all' && product.status !== selectedStatus)
      return false
    if (
      searchTerm &&
      !product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
      return false
    return true
  })

  return (
    <div className='bg-white rounded-lg shadow-md p-6 overflow-y-auto max-h-[calc(100vh-200px)]'>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-6'>
        <h2 className='text-2xl font-bold text-gray-800 flex items-center'>
          <FaBox className='mr-2 text-superadmin-600' />
          Product Management
        </h2>
        <div className='flex space-x-3 mt-3 md:mt-0'>
          <button className='bg-superadmin-600 hover:bg-superadmin-700 text-white px-4 py-2 rounded-md flex items-center'>
            <FaPlus className='mr-2' />
            Add Product
          </button>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
        <div className='relative'>
          <FaSearch className='absolute left-3 top-3 text-gray-400' />
          <input
            type='text'
            placeholder='Search products...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-superadmin-500 focus:border-superadmin-500'
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className='border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-superadmin-500 focus:border-superadmin-500'
        >
          <option value='all'>All Categories</option>
          <option value='Clothing'>Clothing</option>
          <option value='Electronics'>Electronics</option>
          <option value='Accessories'>Accessories</option>
          <option value='Home'>Home</option>
        </select>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className='border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-superadmin-500 focus:border-superadmin-500'
        >
          <option value='all'>All Statuses</option>
          <option value='published'>Published</option>
          <option value='draft'>Draft</option>
          <option value='archived'>Archived</option>
        </select>
      </div>

      <div className='overflow-x-auto'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Product
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                SKU
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Price
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Stock
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Category
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
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='flex items-center'>
                    <div className='flex-shrink-0 h-10 w-10 bg-gray-200 rounded-md flex items-center justify-center'>
                      <FaBox className='text-gray-500' />
                    </div>
                    <div className='ml-4'>
                      <div className='text-sm font-medium text-gray-900'>
                        {product.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono'>
                  {product.sku}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  {product.price}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  <span
                    className={`${product.stock === 0 ? 'text-red-600' : ''}`}
                  >
                    {product.stock}
                  </span>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  <span className='inline-flex items-center'>
                    <FaTags className='mr-1 text-gray-400' />
                    {product.category}
                  </span>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      product.status === 'published'
                        ? 'bg-green-100 text-green-800'
                        : product.status === 'draft'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {product.status.charAt(0).toUpperCase() +
                      product.status.slice(1)}
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
                    <FaEye />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='mt-6 flex justify-between items-center'>
        <div className='text-sm text-gray-600'>
          Showing 1 to {filteredProducts.length} of {filteredProducts.length}{' '}
          products
        </div>
        <div className='flex space-x-2'>
          <button className='px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100'>
            Previous
          </button>
          <button className='px-3 py-1 bg-superadmin-600 text-white rounded-md hover:bg-superadmin-700'>
            1
          </button>
          <button className='px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100'>
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default SuperAdminProducts
