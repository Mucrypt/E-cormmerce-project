import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom' // For the call-to-action button

const UsersOrdersPage = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error] = useState('')

  useEffect(() => {
    // Simulate fetching orders from an API
    setTimeout(() => {
      const mockOrders = [] // Empty array to simulate no orders
      setOrders(mockOrders)
      setLoading(false)
    }, 1000)
  }, [])

  if (loading) {
    return <div className='text-center py-8'>Loading orders...</div>
  }

  if (error) {
    return <div className='text-center py-8 text-red-500'>{error}</div>
  }

  return (
    <div className='p-4 sm:p-6'>
      <h1 className='text-2xl sm:text-3xl font-bold mb-6'>Your Orders</h1>
      {orders.length === 0 ? (
        <div className='text-center py-8'>
          {/** Empty State Illustration */}
          <img
            src='https://via.placeholder.com/300' // Replace with your custom illustration
            alt='No Orders'
            className='w-48 h-48 mx-auto mb-6'
          />
          <p className='text-xl text-gray-600 mb-4'>You have no orders yet.</p>
          <p className='text-gray-500 mb-6'>
            Start shopping and explore our amazing products!
          </p>
          {/** Call-to-Action Button */}
          <Link
            to='/products' // Replace with your products page route
            className='inline-block bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-lg font-semibold transition-all'
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className='space-y-6'>
          {orders.map((order) => (
            <div
              key={order.id}
              className='bg-white p-4 sm:p-6 rounded-lg shadow-md'
            >
              <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4'>
                <div className='mb-4 sm:mb-0'>
                  <h2 className='text-lg sm:text-xl font-semibold'>
                    Order #{order.id}
                  </h2>
                  <p className='text-sm text-gray-500'>
                    Ordered on: {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className='text-sm sm:text-base'>
                  <p className='text-gray-600'>
                    Shipping to: {order.shippingAddress.city},{' '}
                    {order.shippingAddress.country}
                  </p>
                  <p
                    className={`font-semibold ${
                      order.isPaid ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {order.isPaid ? 'Paid' : 'Not Paid'}
                  </p>
                </div>
              </div>
              <div className='border-t pt-4'>
                <h3 className='text-lg font-medium mb-2'>Order Items</h3>
                <div className='space-y-4'>
                  {order.orderItems.map((item, index) => (
                    <div key={index} className='flex items-center space-x-4'>
                      <img
                        src={item.image}
                        alt={item.name}
                        className='w-16 h-16 object-cover rounded-lg'
                      />
                      <div>
                        <p className='text-sm sm:text-base font-medium'>
                          {item.name}
                        </p>
                        <p className='text-sm text-gray-500'>
                          Quantity: {item.quantity}
                        </p>
                        <p className='text-sm text-gray-500'>
                          Price: ${item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className='border-t pt-4'>
                <p className='text-lg font-semibold'>
                  Total: ${order.totalPrice.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default UsersOrdersPage
