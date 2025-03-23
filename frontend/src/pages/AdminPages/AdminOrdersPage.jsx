import { useState, useEffect } from 'react'
import { FaEye, FaCheck, FaTimes } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchAllOrders,
  markOrderAsDelivered,
  cancelOrder,
} from '../../redux/slices/adminOrderSlice'

const AdminOrdersPage = () => {
  const dispatch = useDispatch()
  const { orders, loading, error } = useSelector((state) => state.adminOrders)

  // State for the order details modal
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)

  // State for search and filters
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('')

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1)
  const ordersPerPage = 5

  // Fetch orders on component mount
  useEffect(() => {
    dispatch(fetchAllOrders())
  }, [dispatch])

  // Calculate total sales from delivered orders
  const totalSales = orders
    .filter((order) => order.status === 'Delivered') // Only include delivered orders
    .reduce((total, order) => total + order.totalPrice, 0) // Sum up totalPrice

  // Format total sales as currency
  const formattedTotalSales = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(totalSales)

  // Open the order details modal
  const openOrderDetails = (order) => {
    setSelectedOrder(order)
    setIsModalOpen(true)
  }

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false)
  }

  // Handle marking an order as delivered
  const handleMarkAsDelivered = (id) => {
    dispatch(markOrderAsDelivered(id))
  }

  // Handle canceling an order
  const handleCancelOrder = (id) => {
    dispatch(cancelOrder(id))
  }

  // Filtered orders based on search and status
  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.user.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus ? order.status === filterStatus : true
    return matchesSearch && matchesStatus
  })

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  )

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message || error}</div>

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-semibold mb-6'>Manage Orders</h1>
      <div className='bg-white p-6 rounded-lg shadow-md'>
        {/* Total Sales Display */}
        <div className='mb-6 p-4 bg-blue-50 rounded-lg'>
          <h2 className='text-lg font-semibold text-blue-800'>
            Total Sales:{' '}
            <span className='font-bold'>{formattedTotalSales}</span>
          </h2>
        </div>

        {/* Search and Filters */}
        <div className='flex justify-between mb-4'>
          <div className='flex items-center space-x-4'>
            <div className='relative'>
              <input
                type='text'
                placeholder='Search orders...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='p-2 border rounded-md pl-10'
              />
              <FaEye className='absolute left-3 top-3 text-gray-500' />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className='p-2 border rounded-md'
            >
              <option value=''>All Statuses</option>
              <option value='Delivered'>Delivered</option>
              <option value='Pending'>Pending</option>
            </select>
          </div>
        </div>

        {/* Orders Table */}
        <table className='w-full'>
          <thead>
            <tr className='border-b'>
              <th className='text-left p-2'>Order ID</th>
              <th className='text-left p-2'>Customer</th>
              <th className='text-left p-2'>Total</th>
              <th className='text-left p-2'>Status</th>
              <th className='text-left p-2'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((order) => (
              <tr
                key={order._id}
                className='border-b hover:bg-gray-50 transition-colors'
              >
                <td className='p-2'>#{order._id}</td>
                <td className='p-2'>{order.user.name}</td>
                <td className='p-2'>${order.totalPrice}</td>
                <td className='p-2'>
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      order.status === 'Delivered'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-orange-100 text-orange-700'
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className='p-2 flex space-x-2'>
                  <button
                    onClick={() => openOrderDetails(order)}
                    className='text-blue-500 hover:text-blue-700'
                  >
                    <FaEye />
                  </button>
                  {order.status === 'Pending' && (
                    <>
                      <button
                        onClick={() => handleMarkAsDelivered(order._id)}
                        className='text-green-500 hover:text-green-700'
                      >
                        <FaCheck />
                      </button>
                      <button
                        onClick={() => handleCancelOrder(order._id)}
                        className='text-red-500 hover:text-red-700'
                      >
                        <FaTimes />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className='flex justify-center mt-4'>
          {Array.from({
            length: Math.ceil(filteredOrders.length / ordersPerPage),
          }).map((_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`px-4 py-2 mx-1 rounded-md ${
                currentPage === index + 1
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Order Details Modal */}
      {isModalOpen && selectedOrder && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white p-6 rounded-lg shadow-xl w-full max-w-md'>
            <h2 className='text-xl font-semibold mb-4'>Order Details</h2>
            <div className='space-y-4'>
              <div>
                <strong>Order ID:</strong> #{selectedOrder._id}
              </div>
              <div>
                <strong>Customer:</strong> {selectedOrder.user.name}
              </div>
              <div>
                <strong>Total:</strong> ${selectedOrder.totalPrice}
              </div>
              <div>
                <strong>Status:</strong>{' '}
                <span
                  className={`px-2 py-1 rounded-full text-sm ${
                    selectedOrder.status === 'Delivered'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-orange-100 text-orange-700'
                  }`}
                >
                  {selectedOrder.status}
                </span>
              </div>
              <div className='flex justify-end'>
                <button
                  onClick={closeModal}
                  className='bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors'
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

export default AdminOrdersPage
