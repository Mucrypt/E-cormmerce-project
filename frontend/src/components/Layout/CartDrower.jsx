import { IoMdClose } from 'react-icons/io'
import CartContents from '../Cart/CartContents'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const CartDrawer = ({ drawerOpen, toggleCartDrawer }) => {
  const navigate = useNavigate()
  const { user, guestId } = useSelector((state) => state.auth)
  const { cart } = useSelector((state) => state.cart)
  const userId = user ? user._id : null

  const handleCheckout = () => {
    toggleCartDrawer()
    if (!user) {
      navigate('/login?redirect=checkout')
    } else {
      navigate('/checkout')
    }
  }

  return (
    <div
      className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-[30rem] h-full bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-50 ${
        drawerOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      {/* Close button */}
      <div className='flex justify-end p-2'>
        <button onClick={toggleCartDrawer}>
          <IoMdClose className='h-6 w-6 text-gray-600' />
        </button>
      </div>

      {/* Cart Contents */}
      <div className='flex-grow overflow-y-auto p-4'>
        <h2 className='text-xl font-semibold mb-4'>Your Cart</h2>
        {cart?.products?.length > 0 ? (
          <CartContents cart={cart} userId={userId} guestId={guestId} />
        ) : (
          <p className='text-center text-gray-600'>Your cart is empty</p>
        )}
      </div>

      {/* Checkout */}
      <div className='p-4 bg-white sticky bottom-0'>
        {cart?.products?.length > 0 && (
          <>
            <button
              onClick={handleCheckout}
              className='w-full bg-black text-white py-2 font-semibold rounded-lg hover:bg-gray-800 transition'
            >
              Checkout
            </button>
            <p className='text-sm tracking-tight text-gray-600 text-center mt-2'>
              Shipping & taxes calculated at checkout
            </p>
          </>
        )}
      </div>
    </div>
  )
}

CartDrawer.propTypes = {
  drawerOpen: PropTypes.bool.isRequired,
  toggleCartDrawer: PropTypes.func.isRequired,
}

export default CartDrawer
