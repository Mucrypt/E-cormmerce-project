import { Link } from 'react-router-dom'
import { useState } from 'react'
import {
  HiOutlineUser,
  HiOutlineShoppingBag,
  HiOutlineBars3BottomRight,
} from 'react-icons/hi2'
import { IoMdClose } from 'react-icons/io'
import SearchBar from './SearchBar'
import CartDrower from '../Layout/CartDrower'

const categories = [
  {
    name: 'Men',
    subcategories: ['Shirts', 'Pants', 'Jackets', 'Shoes'],
  },
  {
    name: 'Women',
    subcategories: ['Dresses', 'Tops', 'Jeans', 'Heels'],
  },
  {
    name: 'Children',
    subcategories: ['T-Shirts', 'Shorts', 'Sweaters', 'Sandals'],
  },
  {
    name: 'Electronics',
    subcategories: ['Mobile Phones', 'Laptops', 'Home Appliances'],
  },
  {
    name: 'Home & Kitchen',
    subcategories: ['Furniture', 'Kitchenware'],
  },
]

const Navbar = () => {
  const [drowerOpen, setDrowerOpen] = useState(false)
  const [navDrowerOpen, setNavDrowerOpen] = useState(false)
  const [openCategory, setOpenCategory] = useState(null)

  const toggleNavDrower = () => {
    setNavDrowerOpen(!navDrowerOpen)
  }

  const toggleCartDrower = () => {
    setDrowerOpen(!drowerOpen)
  }

  const handleCategoryHover = (category) => {
    setOpenCategory(category)
  }

  const handleCategoryLeave = () => {
    setOpenCategory(null)
  }

  return (
    <>
      <nav className='container mx-auto flex items-center justify-between py-4 px-6'>
        <div>
          <Link to='/' className='text-3xl font-medium'>
            Mukulah
          </Link>
        </div>

        {/** Center navigation links */}
        <div className='hidden md:flex space-x-6 font-medium uppercase'>
          {categories.map((category) => (
            <div
              key={category.name}
              className='relative'
              onMouseEnter={() => handleCategoryHover(category.name)}
              onMouseLeave={handleCategoryLeave}
            >
              <Link
                to={`/collections/${category.name.toLowerCase()}`}
                className='text-gray-700 hover:text-black text-sm'
              >
                {category.name}
              </Link>
              {openCategory === category.name && (
                <div className='absolute top-full left-0 bg-white shadow-lg mt-2 py-2 w-48 z-50'>
                  {category.subcategories.map((subcategory) => (
                    <Link
                      key={subcategory}
                      to={`/collections/${category.name.toLowerCase()}/${subcategory.toLowerCase()}`}
                      className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                    >
                      {subcategory}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/** Right Icons */}
        <div className='flex items-center space-x-4'>
          <Link to='/admin' className='block bg-black px-2  text-white rounded-md'>Admin</Link>
          <Link to='/Profile' className='hover:text-black'>
            <HiOutlineUser className='text-gray-700 h-6 w-6' />
          </Link>
          <button
            onClick={toggleCartDrower}
            className='relative hover:text-black'
            aria-label='Open cart'
          >
            <HiOutlineShoppingBag className='h-6 w-6 text-gray-700' />
            <span className='absolute -top-1 bg-top-red text-white text-xs rounded-full px-2 py-0.5'>
              0
            </span>
          </button>

          {/** Search */}
          <div className='overflow-hidden'>
            <SearchBar />
          </div>

          {/** Hamburger Menu for Mobile */}
          <button
            onClick={toggleNavDrower}
            className='md:hidden'
            aria-label='Open navigation menu'
          >
            <HiOutlineBars3BottomRight className='h-6 w-6 text-gray-700' />
          </button>
        </div>
      </nav>

      {/** Cart Drawer */}
      <CartDrower drowerOpen={drowerOpen} toggleCartDrower={toggleCartDrower} />

      {/** Mobile Navigation Drawer */}
      <div
        className={`fixed top-0 left-0 w-3/4 h-full z-50 bg-white shadow-lg transform transition-transform duration-300 ${
          navDrowerOpen ? 'translate-x-0' : '-translate-x-full'
        } md:hidden`}
      >
        <div className='flex justify-end p-4'>
          <button onClick={toggleNavDrower} aria-label='Close navigation menu'>
            <IoMdClose className='h-6 w-6 text-gray-700' />
          </button>
        </div>
        {/** Mobile Navigation Links */}
        <div className='p-4'>
          <h2 className='text-xl font-semibold mb-4'>Menu</h2>
          <nav className='flex flex-col space-y-3'>
            {categories.map((category) => (
              <div key={category.name}>
                <Link
                  to={`/collections/${category.name.toLowerCase()}`}
                  onClick={toggleNavDrower}
                  className='text-gray-700 hover:text-black text-sm'
                >
                  {category.name}
                </Link>
                <div className='pl-4 mt-2 space-y-2'>
                  {category.subcategories.map((subcategory) => (
                    <Link
                      key={subcategory}
                      to={`/collections/${category.name.toLowerCase()}/${subcategory.toLowerCase()}`}
                      onClick={toggleNavDrower}
                      className='block text-gray-700 hover:text-black text-sm'
                    >
                      {subcategory}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>
      </div>
    </>
  )
}

export default Navbar
