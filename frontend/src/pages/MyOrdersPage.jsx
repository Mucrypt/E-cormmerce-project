import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    // Simulate fetching orders from an API
    const fetchOrders = async () => {
      // Mock data for orders
      const mockOrders = [
        {
          _id: '615f7f7f3b1f3e1d1f3b1f3e',
          createdAt: new Date(),
          shippingMethod: 'Standard',
          orderItems: [
            {
              productID: '1',
              name: 'Product 1',
              Image: 'https://picsum.photos/id/1/200?random=1',
              price: 100,
              qty: 2,
            },
            {
              productID: '2',
              name: 'Product 2',
              Image: 'https://picsum.photos/id/1/200?random=1',
              price: 50,
              qty: 1,
            },
          ],
          status: 'Delivered',
        },
        {
          _id: '615f7f7f3b1f3e1d1f3b1f3f',
          createdAt: new Date(),
          shippingMethod: 'Express',
          orderItems: [
            {
              productID: '3',
              name: 'Product 3',
              Image: 'https://picsum.photos/id/1/200?random=1',
              price: 75,
              qty: 3,
            },
          ],
          status: 'Pending Delivery',
        },
      ]

      // Simulate a delay for API call
      setTimeout(() => {
        setOrders(mockOrders)
      }, 1000)
    }

    fetchOrders()
  }, [])


    const handleRowClick = (id) => {
    // Redirect to the order details page
    navigate(`/order/${id}`)
    }

  if (!orders.length) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <p className='text-lg text-gray-600'>Loading orders...</p>
      </div>
    )
  }

  return (
    <div className='max-w-7xl mx-auto py-10 px-6 tracking-tighter bg-gray-50 min-h-screen'>
      <h1 className='text-3xl font-bold text-gray-800 mb-6'>My Orders</h1>

      {/* Orders Table */}
      <div className='bg-white rounded-lg p-6 shadow-sm'>
        <div className='overflow-x-auto'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead>
              <tr className='bg-gradient-to-r from-blue-500 to-purple-600'>
                <th className='px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider'>
                  Image
                </th>
                <th className='px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider'>
                  Order ID
                </th>
                <th className='px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider'>
                  Created
                </th>
                <th className='px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider'>
                  Shipping
                </th>
                <th className='px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider'>
                  Items
                </th>
                <th className='px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider'>
                  Price
                </th>
                <th className='px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider'>
                  Status
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {orders.map((order) => (
                <tr key={order._id} onClick={() => handleRowClick(order._id)}>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <img
                      src={order.orderItems[0].Image} // Display the first item's image
                      alt={order.orderItems[0].name}
                      className='w-20 h-24 object-cover rounded-lg shadow-sm'
                    />
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                    {order._id}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                    {order.shippingMethod}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                    {order.orderItems.length}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                    $
                    {order.orderItems
                      .reduce((total, item) => total + item.price * item.qty, 0)
                      .toFixed(2)}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        order.status === 'Delivered'
                          ? 'bg-green-300 text-green-800'
                          : 'bg-orange-300 text-orange-800'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default MyOrdersPage
