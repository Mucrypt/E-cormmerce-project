// ✅ Clean and Fully Functional Navbar with Dynamic Cart Count
import { Link } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import {
  HiOutlineUser,
  HiOutlineShoppingBag,
  HiOutlineBars3BottomRight,
} from 'react-icons/hi2'
import { FaSearch } from 'react-icons/fa'
import {
  IoMdClose,
  IoIosArrowBack,
  IoIosArrowForward,
  IoIosArrowDown,
} from 'react-icons/io'
import axios from 'axios'
import CartDrawer from '../Layout/CartDrower'
import { useSelector } from 'react-redux'

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [navDrawerOpen, setNavDrawerOpen] = useState(false)
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [openCategoryId, setOpenCategoryId] = useState(null)

  const categoriesRef = useRef(null)
  const { cart } = useSelector((state) => state.cart)
  const cartCount =
    cart?.products?.reduce((sum, item) => sum + item.quantity, 0) || 0

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        !e.target.closest('.category-dropdown') &&
        !e.target.closest('.dropdown-full')
      ) {
        setOpenCategoryId(null)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/categories`
        )
        setCategories(response.data)
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to fetch categories')
      } finally {
        setLoading(false)
      }
    }
    fetchCategories()
  }, [])

  const toggleNavDrawer = () => setNavDrawerOpen(!navDrawerOpen)
  const toggleCartDrawer = () => setDrawerOpen(!drawerOpen)

  const scrollCategories = (direction) => {
    if (categoriesRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300
      categoriesRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  const toggleCategoryDropdown = (categoryId, e) => {
    e.stopPropagation()
    setOpenCategoryId(openCategoryId === categoryId ? null : categoryId)
  }

  const selectedCategory = categories.find((cat) => cat._id === openCategoryId)

  if (error) return <p className='text-center text-red-500'>Error: {error}</p>

  return (
    <>
      {drawerOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity duration-300'></div>
      )}

      <nav
        className={`container mx-auto flex flex-col items-center justify-between py-4 px-6 relative z-50 ${
          drawerOpen ? 'pointer-events-none blur-sm' : ''
        }`}
      >
        {/* Top Row */}
        <div className='w-full flex items-center justify-between mb-4'>
          <Link to='/' className='text-3xl font-medium z-50'>
            Mukulah
          </Link>

          {/* Search Bar */}
          <div className='flex-grow mx-4 max-w-md relative'>
            <input
              type='text'
              placeholder='Search...'
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-black pr-12'
            />
            <button className='absolute right-3 top-1/2 transform -translate-y-1/2 bg-black p-2 rounded-md'>
              <FaSearch className='text-white' />
            </button>
          </div>

          {/* Right Icons */}
          <div className='flex items-center space-x-4'>
            <Link
              to='/admin'
              className='block bg-black px-2 text-white rounded-md'
            >
              Admin
            </Link>
            <Link to='/profile' className='hover:text-black'>
              <HiOutlineUser className='text-gray-700 h-6 w-6' />
            </Link>
            <button
              onClick={toggleCartDrawer}
              className='relative hover:text-black'
              aria-label='Open cart'
            >
              <HiOutlineShoppingBag className='h-6 w-6 text-gray-700' />
              {cartCount > 0 && (
                <span className='absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5'>
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={toggleNavDrawer}
              className='md:hidden'
              aria-label='Open navigation menu'
            >
              <HiOutlineBars3BottomRight className='h-6 w-6 text-gray-700' />
            </button>
          </div>
        </div>

        {/* Categories Row */}
        <div className='w-full hidden md:flex items-center justify-center relative'>
          <button
            onClick={() => scrollCategories('left')}
            className='absolute left-0 bg-white p-2 rounded-full shadow-lg z-10'
          >
            <IoIosArrowBack className='text-gray-700 h-6 w-6' />
          </button>

          <div
            ref={categoriesRef}
            className='flex space-x-6 font-medium uppercase overflow-x-auto scrollbar-hide relative scroll-smooth snap-x'
          >
            {loading ? (
              [...Array(4)].map((_, index) => (
                <div
                  key={`skeleton-${index}`}
                  className='h-6 w-24 bg-gray-200 animate-pulse rounded'
                ></div>
              ))
            ) : categories.length > 0 ? (
              categories.map((category) => (
                <div
                  key={category._id}
                  className='relative flex-shrink-0 category-dropdown snap-start'
                >
                  <div className='flex items-center space-x-1'>
                    <Link
                      to={`/category/${category._id}?name=${encodeURIComponent(
                        category.name
                      )}`}
                      className={`text-sm ${
                        openCategoryId === category._id
                          ? 'text-black font-semibold underline'
                          : 'text-gray-700 hover:text-black'
                      }`}
                    >
                      {category.name}
                    </Link>
                    <button
                      onClick={(e) => toggleCategoryDropdown(category._id, e)}
                      className='focus:outline-none'
                      aria-label='Toggle subcategories'
                    >
                      <IoIosArrowDown className='text-gray-700 h-4 w-4' />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className='text-center col-span-full'>No categories found.</p>
            )}
          </div>

          <button
            onClick={() => scrollCategories('right')}
            className='absolute right-0 bg-white p-2 rounded-full shadow-lg z-10'
          >
            <IoIosArrowForward className='text-gray-700 h-6 w-6' />
          </button>

          {selectedCategory?.subcategories?.length > 0 && (
            <div className='dropdown-full absolute top-full left-0 w-full bg-white shadow-xl z-50 border-t border-gray-200'>
              <div className='container mx-auto px-6 py-4'>
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
                  {selectedCategory.subcategories.map((subcategory) => (
                    <div key={subcategory._id} className='text-center'>
                      <img
                        src={subcategory.image}
                        alt={subcategory.name}
                        className='w-full h-24 object-cover rounded-lg'
                      />
                      <p className='mt-2 text-sm'>{subcategory.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />

      <div
        className={`fixed top-0 left-0 w-3/4 h-full z-50 bg-white shadow-lg transform transition-transform duration-300 ${
          navDrawerOpen ? 'translate-x-0' : '-translate-x-full'
        } md:hidden`}
      >
        <div className='flex justify-end p-4'>
          <button onClick={toggleNavDrawer} aria-label='Close navigation menu'>
            <IoMdClose className='h-6 w-6 text-gray-700' />
          </button>
        </div>
        <div className='p-4'>
          <h2 className='text-xl font-semibold mb-4'>Menu</h2>
          <nav className='flex flex-col space-y-3'>
            {loading ? (
              [...Array(4)].map((_, index) => (
                <div
                  key={`mobile-skeleton-${index}`}
                  className='h-6 w-24 bg-gray-200 animate-pulse rounded'
                ></div>
              ))
            ) : categories.length > 0 ? (
              categories.map((category) => (
                <div key={category._id}>
                  <Link
                    to={`/category/${category._id}?name=${encodeURIComponent(
                      category.name
                    )}`}
                    className='text-gray-700 hover:text-black text-sm'
                  >
                    {category.name}
                  </Link>
                </div>
              ))
            ) : (
              <p className='text-center col-span-full'>No categories found.</p>
            )}
          </nav>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  )
}

export default Navbar
