import {
  FaShoppingCart,
  FaSearch,
  FaFilter,
  FaFileExport,
} from 'react-icons/fa'
import { useState } from 'react'

const SuperAdminOrders = () => {
  const [statusFilter, setStatusFilter] = useState('all')
  //const [dateRange, setDateRange] = useState('all')

  const orders = [
    {
      id: 'ORD-1001',
      customer: 'John Doe',
      date: '2023-05-15',
      amount: '$149.99',
      status: 'completed',
      payment: 'credit_card',
    },
    {
      id: 'ORD-1002',
      customer: 'Jane Smith',
      date: '2023-05-16',
      amount: '$89.50',
      status: 'processing',
      payment: 'paypal',
    },
    {
      id: 'ORD-1003',
      customer: 'Robert Johnson',
      date: '2023-05-17',
      amount: '$210.00',
      status: 'shipped',
      payment: 'credit_card',
    },
    {
      id: 'ORD-1004',
      customer: 'Emily Davis',
      date: '2023-05-18',
      amount: '$65.25',
      status: 'pending',
      payment: 'bank_transfer',
    },
    {
      id: 'ORD-1005',
      customer: 'Michael Wilson',
      date: '2023-05-19',
      amount: '$175.80',
      status: 'cancelled',
      payment: 'credit_card',
    },
  ]

  const filteredOrders = orders.filter((order) => {
    if (statusFilter !== 'all' && order.status !== statusFilter) return false
    // Add date range filtering logic here
    return true
  })

  return (
    <div className='bg-white rounded-lg shadow-md p-6 overflow-y-auto max-h-[calc(100vh-200px)]'>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-6'>
        <h2 className='text-2xl font-bold text-gray-800 flex items-center'>
          <FaShoppingCart className='mr-2 text-superadmin-600' />
          Orders Management
        </h2>
        <div className='flex space-x-3 mt-3 md:mt-0'>
          <button className='border border-gray-300 hover:bg-gray-100 px-4 py-2 rounded-md flex items-center'>
            <FaFileExport className='mr-2' />
            Export
          </button>
          <div className='relative'>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className='border border-gray-300 hover:bg-gray-100 px-4 py-2 rounded-md appearance-none pr-8'
            >
              <option value='all'>All Statuses</option>
              <option value='pending'>Pending</option>
              <option value='processing'>Processing</option>
              <option value='shipped'>Shipped</option>
              <option value='completed'>Completed</option>
              <option value='cancelled'>Cancelled</option>
            </select>
            <FaFilter className='absolute right-3 top-3 text-gray-400 pointer-events-none' />
          </div>
        </div>
      </div>

      <div className='mb-6'>
        <div className='relative'>
          <FaSearch className='absolute left-3 top-3 text-gray-400' />
          <input
            type='text'
            placeholder='Search orders by ID, customer or email...'
            className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-superadmin-500 focus:border-superadmin-500'
          />
        </div>
      </div>

      <div className='overflow-x-auto'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Order ID
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Customer
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Date
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Amount
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Status
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Payment
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                  {order.id}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  {order.customer}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  {order.date}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  {order.amount}
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      order.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : order.status === 'processing'
                        ? 'bg-blue-100 text-blue-800'
                        : order.status === 'shipped'
                        ? 'bg-yellow-100 text-yellow-800'
                        : order.status === 'pending'
                        ? 'bg-gray-100 text-gray-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)}
                  </span>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  {order.payment
                    .replace('_', ' ')
                    .replace(/\b\w/g, (l) => l.toUpperCase())}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                  <button className='text-superadmin-600 hover:text-superadmin-700 mr-3'>
                    View
                  </button>
                  <button className='text-gray-600 hover:text-gray-700'>
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='mt-6 flex justify-between items-center'>
        <div className='text-sm text-gray-600'>
          Showing 1 to {filteredOrders.length} of {filteredOrders.length} orders
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

export default SuperAdminOrders
