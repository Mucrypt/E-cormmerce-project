import {
  FaBoxes,
  FaSearch,
 
  FaExclamationTriangle,
  FaArrowUp,
  FaArrowDown,
} from 'react-icons/fa'
import { useState } from 'react'

const inventoryItems = [
  {
    id: 1,
    product: 'Premium T-Shirt',
    sku: 'TSHIRT-PRE',
    stock: 42,
    lowStock: 10,
    status: 'in-stock',
  },
  {
    id: 2,
    product: 'Wireless Headphones',
    sku: 'HP-WL-100',
    stock: 15,
    lowStock: 5,
    status: 'low-stock',
  },
  {
    id: 3,
    product: 'Leather Wallet',
    sku: 'WALLET-LTH',
    stock: 28,
    lowStock: 10,
    status: 'in-stock',
  },
  {
    id: 4,
    product: 'Stainless Steel Bottle',
    sku: 'BOTTLE-SS',
    stock: 0,
    lowStock: 5,
    status: 'out-of-stock',
  },
]

const SuperAdminInventory = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [showStockUpdate, setShowStockUpdate] = useState(null)

  const filteredItems = inventoryItems.filter((item) => {
    if (selectedStatus !== 'all' && item.status !== selectedStatus) return false
    if (
      searchTerm &&
      !item.product.toLowerCase().includes(searchTerm.toLowerCase())
    )
      return false
    return true
  })

  return (
    <div className='bg-white rounded-lg shadow-md p-6 overflow-y-auto max-h-[calc(100vh-200px)] '>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-6'>
        <h2 className='text-2xl font-bold text-gray-800 flex items-center'>
          <FaBoxes className='mr-2 text-superadmin-600' />
          Inventory Management
        </h2>
        <div className='flex space-x-3 mt-3 md:mt-0'>
          <div className='relative'>
            <FaSearch className='absolute left-3 top-3 text-gray-400' />
            <input
              type='text'
              placeholder='Search inventory...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-superadmin-500 focus:border-superadmin-500'
            />
          </div>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className='border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-superadmin-500 focus:border-superadmin-500'
          >
            <option value='all'>All Statuses</option>
            <option value='in-stock'>In Stock</option>
            <option value='low-stock'>Low Stock</option>
            <option value='out-of-stock'>Out of Stock</option>
          </select>
        </div>
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
                Current Stock
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Low Stock Threshold
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
            {filteredItems.map((item) => (
              <tr key={item.id}>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='flex items-center'>
                    <div className='flex-shrink-0 h-10 w-10 bg-gray-200 rounded-md flex items-center justify-center'>
                      <FaBoxes className='text-gray-500' />
                    </div>
                    <div className='ml-4'>
                      <div className='text-sm font-medium text-gray-900'>
                        {item.product}
                      </div>
                    </div>
                  </div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono'>
                  {item.sku}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  {item.stock}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  {item.lowStock}
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      item.status === 'in-stock'
                        ? 'bg-green-100 text-green-800'
                        : item.status === 'low-stock'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {item.status.replace('-', ' ')}
                  </span>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                  {showStockUpdate === item.id ? (
                    <div className='flex space-x-2'>
                      <input
                        type='number'
                        className='w-20 border border-gray-300 rounded-md px-2 py-1 text-sm'
                        placeholder='Qty'
                      />
                      <button className='text-green-600 hover:text-green-700'>
                        <FaArrowUp />
                      </button>
                      <button className='text-red-600 hover:text-red-700'>
                        <FaArrowDown />
                      </button>
                      <button
                        onClick={() => setShowStockUpdate(null)}
                        className='text-gray-600 hover:text-gray-700'
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowStockUpdate(item.id)}
                      className='text-superadmin-600 hover:text-superadmin-700'
                    >
                      Update Stock
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-4'>
        <div className='flex'>
          <div className='flex-shrink-0'>
            <FaExclamationTriangle className='h-5 w-5 text-yellow-400' />
          </div>
          <div className='ml-3'>
            <h3 className='text-sm font-medium text-yellow-800'>
              Low Stock Alert
            </h3>
            <div className='mt-2 text-sm text-yellow-700'>
              <p>
                {
                  inventoryItems.filter((item) => item.status === 'low-stock')
                    .length
                }{' '}
                products are currently low in stock. Consider replenishing
                inventory soon.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SuperAdminInventory
