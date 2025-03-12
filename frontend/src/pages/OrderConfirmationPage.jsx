const checkout = {
  _id: '615f7f7f3b1f3e1d1f3b1f3e',
  createdAt: new Date(),
  checkoutItems: [
    {
      productId: 1,
      price: 100,
      qty: 2,
      Image: 'https://picsum.photos/id/1/200?random=1',
      size: 'M',
      color: 'red',
      name: 'T-shirt',
    },
    {
      productId: 2,
      size: 'XL',
      color: 'red',
      name: 'Jeans',
      price: 200,
      qty: 1,
      Image: 'https://picsum.photos/id/9/200?random=9',
    },
  ],
  shippingAddress: {
    address: '123 Street',
    city: 'City',
    postalCode: '12345',
    country: 'Country',
  },
  estimatedDelivery: 'October 30, 2023', // Mock estimated delivery date
  trackingId: '1234567890', // Mock tracking ID
  paymentMethod: {
    type: 'Credit Card', // Payment method type (e.g., PayPal, Credit Card)
    last4Digits: '1234', // Last 4 digits of the card (if applicable)
  },
}

const OrderConfirmationPage = () => {
  // Check if checkout data is present
  if (
    !checkout ||
    !checkout._id ||
    !checkout.checkoutItems ||
    !checkout.shippingAddress
  ) {
    return (
      <div className='max-w-7xl mx-auto py-10 px-6 tracking-tighter text-center'>
        <h1 className='text-3xl font-bold text-gray-800 mb-6'>
          No Order Found
        </h1>
        <p className='text-lg text-gray-600'>
          It seems there was an issue with your order. Please try again or
          contact support.
        </p>
      </div>
    )
  }

  return (
    <div className='max-w-7xl mx-auto py-10 px-6 tracking-tighter bg-green-50'>
      <h1 className='text-3xl font-bold text-gray-800 mb-6'>
        Thank you for your order!
      </h1>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        {/* Order Details */}
        <div className='bg-white rounded-lg p-6 shadow-sm'>
          <h2 className='text-2xl uppercase mb-6 font-bold text-gray-800'>
            Order Details
          </h2>
          <div className='space-y-4'>
            <div>
              <p className='text-sm text-gray-600'>Order ID:</p>
              <p className='text-lg font-semibold text-gray-800'>
                {checkout._id}
              </p>
            </div>
            <div>
              <p className='text-sm text-gray-600'>Order Date:</p>
              <p className='text-lg font-semibold text-gray-800'>
                {checkout.createdAt.toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Shipping Address */}
        <div className='bg-white rounded-lg p-6 shadow-sm'>
          <h2 className='text-2xl uppercase mb-6 font-bold text-gray-800'>
            Shipping Address
          </h2>
          <div className='space-y-4'>
            <div>
              <p className='text-sm text-gray-600'>Address:</p>
              <p className='text-lg font-semibold text-gray-800'>
                {checkout.shippingAddress.address}
              </p>
            </div>
            <div>
              <p className='text-sm text-gray-600'>City:</p>
              <p className='text-lg font-semibold text-gray-800'>
                {checkout.shippingAddress.city}
              </p>
            </div>
            <div>
              <p className='text-sm text-gray-600'>Postal Code:</p>
              <p className='text-lg font-semibold text-gray-800'>
                {checkout.shippingAddress.postalCode}
              </p>
            </div>
            <div>
              <p className='text-sm text-gray-600'>Country:</p>
              <p className='text-lg font-semibold text-gray-800'>
                {checkout.shippingAddress.country}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div className='bg-white rounded-lg p-6 shadow-sm mt-8'>
        <h2 className='text-2xl uppercase mb-6 font-bold text-gray-800'>
          Payment Method
        </h2>
        <div className='space-y-4'>
          <p className='text-lg font-semibold text-gray-800'>
            {checkout.paymentMethod.type}
          </p>
          {checkout.paymentMethod.last4Digits && (
            <p className='text-sm text-gray-600'>
              Ending in **** {checkout.paymentMethod.last4Digits}
            </p>
          )}
        </div>
      </div>

      {/* Estimated Delivery */}
      <div className='bg-white rounded-lg p-6 shadow-sm mt-8'>
        <h2 className='text-2xl uppercase mb-6 font-bold text-gray-800'>
          Estimated Delivery
        </h2>
        <div className='space-y-4'>
          <p className='text-lg font-semibold text-gray-800'>
            Your order is expected to arrive by{' '}
            <span className='text-blue-600'>{checkout.estimatedDelivery}</span>.
          </p>
          <p className='text-sm text-gray-600'>
            Delivery times may vary depending on your location and shipping
            method.
          </p>
        </div>
      </div>

      {/* Track Delivery */}
      <div className='bg-white rounded-lg p-6 shadow-sm mt-8'>
        <h2 className='text-2xl uppercase mb-6 font-bold text-gray-800'>
          Track Your Delivery
        </h2>
        <div className='space-y-4'>
          <p className='text-lg font-semibold text-gray-800'>
            Tracking ID:{' '}
            <span className='text-blue-600'>{checkout.trackingId}</span>
          </p>
          <button
            className='bg-defaul-button-colors text-white py-2 px-4 rounded-md hover:bg-defaul-button-colors-hover transition-colors'
            onClick={() => {
              // Simulate tracking action
              alert(`Tracking your order with ID: ${checkout.trackingId}`)
            }}
          >
            Track Order
          </button>
        </div>
      </div>

      {/* Order Items */}
      <div className='bg-white rounded-lg p-6 shadow-sm mt-8'>
        <h2 className='text-2xl uppercase mb-6 font-bold text-gray-800'>
          Order Items
        </h2>
        <div className='border-t border-gray-200 py-4'>
          {checkout.checkoutItems.map((item) => (
            <div
              key={item.productId}
              className='flex items-start justify-between py-4 border-b border-gray-200 last:border-b-0'
            >
              {/* Product Image */}
              <div className='flex items-start'>
                <img
                  src={item.Image}
                  alt={item.name}
                  className='w-20 h-24 mr-4 object-cover rounded-lg shadow-sm'
                />
              </div>

              {/* Product Details */}
              <div className='flex-1 flex justify-between items-start'>
                <div>
                  <h3 className='text-lg font-semibold text-gray-800'>
                    {item.name}
                  </h3>
                </div>
                <div className='text-right'>
                  <p className='text-sm text-gray-600'>
                    <span className='font-medium'>Size:</span> {item.size}
                  </p>
                  <p className='text-sm text-gray-600'>
                    <span className='font-medium'>Color:</span> {item.color}
                  </p>
                  <p className='text-sm text-gray-600'>
                    <span className='font-medium'>Price:</span> ${item.price} x{' '}
                    {item.qty}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Total Price */}
        <div className='mt-6 border-t border-gray-200 pt-4'>
          <div className='flex justify-between'>
            <p className='text-lg font-bold text-gray-800'>Total</p>
            <p className='text-lg font-bold text-gray-800'>
              $
              {checkout.checkoutItems
                .reduce((total, item) => total + item.price * item.qty, 0)
                .toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderConfirmationPage
