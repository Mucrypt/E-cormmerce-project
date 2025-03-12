import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PayPalButton from './PayPalButton'

// Mock cart data
const cart = {
  products: [
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
  totalPrices: 400,
}

const Checkout = () => {
  const navigate = useNavigate()
  const [checkoutId, setCheckoutId] = useState(null)
  const [shippingAddress, setShippingAddress] = useState({
    FirstName: '',
    LastName: '',
    Address: '',
    City: '',
    PostalCode: '',
    Country: '',
    Phone: '',
  })

  // Handle form submission
  const handleCreateCheckout = (e) => {
    e.preventDefault()

    // Validate shipping address fields
    if (
      !shippingAddress.FirstName ||
      !shippingAddress.LastName ||
      !shippingAddress.Address ||
      !shippingAddress.City ||
      !shippingAddress.PostalCode ||
      !shippingAddress.Country ||
      !shippingAddress.Phone
    ) {
      alert('Please fill out all shipping address fields.')
      return
    }

    // Simulate creating a checkout
    setCheckoutId(123) // Set a mock checkout ID
  }

  const handlePaymentSuccess = (details) => {
    console.log('Payment Successful', details)
    // Redirect to the order confirmation page
    navigate('/order-confirmation', {
      state: {
        checkoutId: checkoutId, // Pass the checkout ID or any other data
        shippingAddress: shippingAddress, // Pass the shipping address
        cart: cart, // Pass the cart data
      },
    })
  }

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter'>
      {/** Shipping Address */}
      <div className='bg-white rounded-lg p-6'>
        <h2 className='text-2xl uppercase mb-6'>Checkout</h2>
        <form onSubmit={handleCreateCheckout}>
          <h3 className='text-lg mb-4'>Contact Details</h3>
          <div className='mb-4'>
            <label htmlFor='email' className='block text-gray-800'>
              Email
            </label>
            <input
              type='email'
              id='email'
              value='user@example.com'
              disabled
              className='w-full border border-gray-300 rounded p-2'
            />
          </div>

          <h3 className='text-lg mb-4'>Delivery</h3>
          <div className='mb-4'>
            <label htmlFor='firstName' className='block text-gray-800'>
              First Name
            </label>
            <input
              required
              type='text'
              id='firstName'
              value={shippingAddress.FirstName}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  FirstName: e.target.value,
                })
              }
              className='w-full border border-gray-300 rounded p-2'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='lastName' className='block text-gray-800'>
              Last Name
            </label>
            <input
              required
              type='text'
              id='lastName'
              value={shippingAddress.LastName}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  LastName: e.target.value,
                })
              }
              className='w-full border border-gray-300 rounded p-2'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='address' className='block text-gray-800'>
              Address
            </label>
            <input
              required
              id='address'
              value={shippingAddress.Address}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  Address: e.target.value,
                })
              }
              className='w-full border border-gray-300 rounded p-2'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='city' className='block text-gray-800'>
              City
            </label>
            <input
              required
              type='text'
              id='city'
              value={shippingAddress.City}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  City: e.target.value,
                })
              }
              className='w-full border border-gray-300 rounded p-2'
            />
          </div>
          <div className='mb-4 grid grid-cols-2 gap-4'>
            <div>
              <label htmlFor='postalCode' className='block text-gray-800'>
                Postal Code
              </label>
              <input
                required
                type='text'
                id='postalCode'
                value={shippingAddress.PostalCode}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    PostalCode: e.target.value,
                  })
                }
                className='w-full border border-gray-300 rounded p-2'
              />
            </div>
            <div>
              <label htmlFor='country' className='block text-gray-800'>
                Country
              </label>
              <input
                required
                type='text'
                id='country'
                value={shippingAddress.Country}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    Country: e.target.value,
                  })
                }
                className='w-full border border-gray-300 rounded p-2'
              />
            </div>
          </div>
          <div className='mb-4'>
            <label htmlFor='phone' className='block text-gray-800'>
              Phone
            </label>
            <input
              required
              type='text'
              id='phone'
              value={shippingAddress.Phone}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  Phone: e.target.value,
                })
              }
              className='w-full border border-gray-300 rounded p-2'
            />
          </div>
          <div className='mt-6'>
            {!checkoutId ? (
              <button
                type='submit'
                className='bg-defaul-button-colors font-bold text-lg text-white py-3 rounded-md w-full hover:bg-defaul-button-colors'
              >
                Continue to Payment
              </button>
            ) : (
              <div>
                <h3 className='text-lg mb-4'>Pay with PayPal</h3>
                <PayPalButton
                  amount={cart.totalPrices.toString()} // Ensure amount is a string
                  onSuccess={handlePaymentSuccess}
                  onError={() => alert('Payment Failed. Try again.')}
                />
              </div>
            )}
          </div>
        </form>
      </div>

      {/** Order Summary */}
      <div className='bg-gray-50 rounded-lg p-6 shadow-sm'>
        <h2 className='text-2xl uppercase mb-6 font-bold text-gray-800'>
          Order Summary
        </h2>
        <div className='border-t border-gray-200 py-4 mb-4'>
          {cart.products.map((product) => (
            <div
              key={product.productId}
              className='flex items-start justify-between py-4 border-b border-gray-200 last:border-b-0'
            >
              {/* Product Image */}
              <div className='flex items-start'>
                <img
                  src={product.Image}
                  alt={product.name}
                  className='w-20 h-24 mr-4 object-cover rounded-lg shadow-sm'
                />
              </div>

              {/* Product Details */}
              <div className='flex-1 flex justify-between items-start'>
                <div>
                  <h3 className='text-lg font-semibold text-gray-800'>
                    {product.name}
                  </h3>
                </div>
                <div className='text-right'>
                  <p className='text-sm text-gray-600'>
                    <span className='font-medium'>Size:</span> {product.size}
                  </p>
                  <p className='text-sm text-gray-600'>
                    <span className='font-medium'>Color:</span> {product.color}
                  </p>
                  <p className='text-sm text-gray-600'>
                    <span className='font-medium'>Price:</span> ${product.price}{' '}
                    x {product.qty}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Subtotal and Shipping */}
        <div className='flex justify-between items-center text-lg font-semibold text-gray-800 mb-4'>
          <p>Subtotal</p>
          <p>${cart.totalPrices?.toLocaleString()}</p>
        </div>
        <div className='flex justify-between items-center text-lg font-semibold text-gray-800 mb-4'>
          <p>Shipping</p>
          <p>Free</p>
        </div>

        {/* Total Price */}
        <div className='mt-6 border-t border-gray-200 pt-4'>
          <div className='flex justify-between'>
            <p className='text-lg font-bold text-gray-800'>Total</p>
            <p className='text-lg font-bold text-gray-800'>
              ${cart.totalPrices}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
