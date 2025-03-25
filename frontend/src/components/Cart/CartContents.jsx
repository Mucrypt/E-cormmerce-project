import { RiDeleteBin3Line } from 'react-icons/ri'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import {
  removeFromCart,
  updateCartItemQuantity,
} from '../../redux/slices/cartSlice'

const CartContents = ({ cart, userId, guestId }) => {
  const dispatch = useDispatch()

  const handleQtyChange = (product, change) => {
    const newQty = product.quantity + change
    if (newQty >= 1) {
      dispatch(
        updateCartItemQuantity({
          userId,
          guestId,
          productId: product.productId,
          quantity: newQty,
          size: product.size,
          color: product.color,
        })
      )
    }
  }

  const handleRemove = (product) => {
    dispatch(
      removeFromCart({
        userId,
        guestId,
        productId: product.productId,
        size: product.size,
        color: product.color,
      })
    )
  }

  return (
    <div>
      {cart?.products?.map((product, index) => (
        <div
          key={index}
          className='flex items-center justify-between py-4 border-b'
        >
          <div className='flex items-start'>
            <img
              src={product.image}
              alt={product.name}
              className='w-20 h-24 object-cover mr-4 rounded-md'
            />
            <div>
              <h3 className='font-semibold'>{product.name}</h3>
              <p className='text-sm text-gray-500'>
                {product.size} | Color: {product.color}
              </p>
              <div className='flex items-center gap-2 mt-2'>
                <button
                  className='text-xl border rounded px-2 py-1 font-medium'
                  onClick={() => handleQtyChange(product, -1)}
                >
                  -
                </button>
                <span>{product.quantity}</span>
                <button
                  className='text-xl border rounded px-2 py-1 font-medium'
                  onClick={() => handleQtyChange(product, 1)}
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <div className='text-right'>
            <p className='font-semibold'>
              ${(product.price * product.quantity).toLocaleString()}
            </p>
            <button
              onClick={() => handleRemove(product)}
              className='mt-2 inline-block'
            >
              <RiDeleteBin3Line className='h-6 w-6 text-red-700 hover:text-red-900 transition' />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

CartContents.propTypes = {
  cart: PropTypes.object.isRequired,
  userId: PropTypes.string,
  guestId: PropTypes.string,
}

export default CartContents
