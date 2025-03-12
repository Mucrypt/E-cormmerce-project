import { IoMdClose } from 'react-icons/io'
import CartContents from '../Cart/CartContents'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

const CartDrower = ({ drowerOpen, toggleCartDrower }) => {
  const navigate = useNavigate()
  const handleCheckout = () => {
    toggleCartDrower()
    navigate('/checkout')

  }
  return (
    <div
      className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-[30rem] h-full bg-white shadow-lg transform transition-transform duration-300 flex flex-col ${
        drowerOpen ? 'translate-x-0' : 'translate-x-full'
      } `}
    >
      {/**close button */}
      <div className='flex justify-end p-2'>
        <button onClick={toggleCartDrower}>
          <IoMdClose className='h-6 w-6 text-gray-600' />
        </button>
      </div>
      {/**Cart contents with scrollable area */}
      <div className='flex-grow flow-y-auto p-4'>
        <h2 className='text-xl font-semibold mb-4'>Your Cart</h2>
        {/**Cart items */}
        <CartContents />
      </div>
      {/**Checkout button */}
      <div className='p-4 bg-white sticky bottom-0 '>
        <button onClick={handleCheckout} className='w-full bg-black text-white py-2 transition font-semibold rounded-lg  hover:bg-gray-800'>
          Checkout
        </button>
        <p className='text-sm tracking-tighter text-gray-600 textcenter-'>
          Shipping & taxes calculated at checkout
        </p>
      </div>
    </div>
  )
}
CartDrower.propTypes = {
  drowerOpen: PropTypes.bool.isRequired,
  toggleCartDrower: PropTypes.func.isRequired,
}

export default CartDrower
