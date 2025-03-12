import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

const OrderDetailsPage = () => {
  const { id } = useParams()
  const [orderDetails, setOrderDetails] = useState(null)

  useEffect(() => {
    // Simulate fetching order details from an API
    const fetchOrderDetails = async () => {
      // Sample data to work with
      const mockOrderDetails = {
        _id: id,
        createdAt: new Date(),
        isPaid: true,
        isDelivered: false,
        paymentMethod: 'PayPal',
        shippingMethod: 'Standard',
        shippingAddress: {
          address: '123 Main St',
          city: 'Springfield',
          postalCode: '12345',
          country: 'USA',
        },
        orderItems: [
          {
            productID: '1',
            name: 'Product 1',
            Image: 'https://picsum.photos/id/1/200?random=1',
            price: 100,
            qty: 2,
            product: '1',
          },
          {
            productID: '2',
            name: 'Product 2',
            Image: 'https://picsum.photos/id/1/200?random=1',
            price: 50,
            qty: 1,
            product: '2',
          },
        ],
      }

      // Simulate a delay for API call
      setTimeout(() => {
        setOrderDetails(mockOrderDetails)
      }, 1000)
    }

    fetchOrderDetails()
  }, [id])

  if (!orderDetails) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <p className='text-lg text-gray-600'>Loading order details...</p>
      </div>
    )
  }

  return (
    <div className='max-w-7xl mx-auto py-10 px-6 tracking-tighter bg-gray-50 min-h-screen'>
      {/* Back to My Orders Link */}
      <Link
        to='/my-orders'
        className='text-blue-500 hover:underline text-lg mb-4 inline-block'
      >
        &larr; Back to My Orders
      </Link>

      <h1 className='text-3xl font-bold text-gray-800 mb-6'>Order Details</h1>

      {/* Order Summary */}
      <div className='bg-white rounded-lg p-6 shadow-sm mb-8'>
        <h2 className='text-2xl uppercase mb-6 font-bold text-gray-800'>
          Order Summary
        </h2>
        <div className='space-y-4'>
          <div>
            <p className='text-sm text-gray-600'>Order ID:</p>
            <p className='text-lg font-semibold text-gray-800'>
              {orderDetails._id}
            </p>
          </div>
          <div>
            <p className='text-sm text-gray-600'>Order Date:</p>
            <p className='text-lg font-semibold text-gray-800'>
              {orderDetails.createdAt.toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className='text-sm text-gray-600'>Payment Method:</p>
            <p className='text-lg font-semibold text-gray-800'>
              {orderDetails.paymentMethod}
            </p>
          </div>
          <div>
            <p className='text-sm text-gray-600'>Shipping Method:</p>
            <p className='text-lg font-semibold text-gray-800'>
              {orderDetails.shippingMethod}
            </p>
          </div>
          <div className='flex justify-between items-center'>
            <p className='text-sm text-gray-600'>Order Status:</p>
            <div className='flex gap-2'>
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  orderDetails.isPaid
                    ? 'bg-green-300 text-green-800'
                    : 'bg-red-300 text-red-800'
                }`}
              >
                {orderDetails.isPaid ? 'Approved' : 'Not Approved'}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  orderDetails.isDelivered
                    ? 'bg-green-300 text-green-800'
                    : 'bg-orange-300 text-orange-800'
                }`}
              >
                {orderDetails.isDelivered ? 'Delivered' : 'Pending Delivery'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Shipping Address */}
      <div className='bg-white rounded-lg p-6 shadow-sm mb-8'>
        <h2 className='text-2xl uppercase mb-6 font-bold text-gray-800'>
          Shipping Address
        </h2>
        <div className='space-y-4'>
          <div>
            <p className='text-sm text-gray-600'>Address:</p>
            <p className='text-lg font-semibold text-gray-800'>
              {orderDetails.shippingAddress.address}
            </p>
          </div>
          <div>
            <p className='text-sm text-gray-600'>City:</p>
            <p className='text-lg font-semibold text-gray-800'>
              {orderDetails.shippingAddress.city}
            </p>
          </div>
          <div>
            <p className='text-sm text-gray-600'>Postal Code:</p>
            <p className='text-lg font-semibold text-gray-800'>
              {orderDetails.shippingAddress.postalCode}
            </p>
          </div>
          <div>
            <p className='text-sm text-gray-600'>Country:</p>
            <p className='text-lg font-semibold text-gray-800'>
              {orderDetails.shippingAddress.country}
            </p>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className='bg-white rounded-lg p-6 shadow-sm'>
        <h2 className='text-2xl uppercase mb-6 font-bold text-gray-800'>
          Order Items
        </h2>
        <div className='overflow-x-auto'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead>
              <tr className='bg-gradient-to-r from-blue-500 to-purple-600'>
                <th className='px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider'>
                  Image
                </th>
                <th className='px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider'>
                  Name
                </th>
                <th className='px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider'>
                  Unit Price
                </th>
                <th className='px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider'>
                  Quantity
                </th>
                <th className='px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider'>
                  Total
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {orderDetails.orderItems.map((item) => (
                <tr key={item.productID}>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <img
                      src={item.Image}
                      alt={item.name}
                      className='w-20 h-24 object-cover rounded-lg shadow-sm'
                    />
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                    {item.name}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                    ${item.price.toFixed(2)}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                    {item.qty}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                    ${(item.price * item.qty).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total Price */}
        <div className='mt-6 border-t border-gray-200 pt-4'>
          <div className='flex justify-between'>
            <p className='text-lg font-bold text-gray-800'>Total</p>
            <p className='text-lg font-bold text-gray-800'>
              $
              {orderDetails.orderItems
                .reduce((total, item) => total + item.price * item.qty, 0)
                .toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderDetailsPage
