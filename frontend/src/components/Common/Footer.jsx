import { IoLogoInstagram } from 'react-icons/io'
import { RiTwitterXLine } from 'react-icons/ri'
import { TbBrandMeta } from 'react-icons/tb'
import { FiPhoneCall } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='bg-green-50 border-t py-12 px-6'>
      <div className='container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 lg:px-0'>
        {/** Newsletter Section */}
        <div className='space-y-4'>
          <h3 className='text-xl font-semibold text-gray-800'>Newsletter</h3>
          <p className='text-gray-600'>
            Subscribe to our newsletter to get updates on our latest offers!
          </p>
          {/** Newsletter Form */}
          <form className='flex'>
            <input
              type='email'
              placeholder='Enter your email'
              className='p-3 w-full text-sm border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all'
              required
            />
            <button
              type='submit'
              className='bg-defaul-button-colors text-white px-6 rounded-r-md text-sm hover:bg-defaul-button-colors-hover transition-all'
            >
              Subscribe
            </button>
          </form>
        </div>

        {/** Shop Links Section */}
        <div className='space-y-4'>
          <h3 className='text-xl font-semibold text-gray-800'>Shop</h3>
          <ul className='space-y-2 text-gray-600'>
            <li>
              <Link to='#' className='hover:text-gray-900 transition-colors'>
                Men
              </Link>
            </li>
            <li>
              <Link to='#' className='hover:text-gray-900 transition-colors'>
                Women
              </Link>
            </li>
            <li>
              <Link to='#' className='hover:text-gray-900 transition-colors'>
                Children
              </Link>
            </li>
            <li>
              <Link to='#' className='hover:text-gray-900 transition-colors'>
                Accessories
              </Link>
            </li>
          </ul>
        </div>

        {/** Support Links Section */}
        <div className='space-y-4'>
          <h3 className='text-xl font-semibold text-gray-800'>Support</h3>
          <ul className='space-y-2 text-gray-600'>
            <li>
              <Link to='#' className='hover:text-gray-900 transition-colors'>
                Contact Us
              </Link>
            </li>
            <li>
              <Link to='#' className='hover:text-gray-900 transition-colors'>
                FAQ
              </Link>
            </li>
            <li>
              <Link to='#' className='hover:text-gray-900 transition-colors'>
                Shipping
              </Link>
            </li>
            <li>
              <Link to='#' className='hover:text-gray-900 transition-colors'>
                Returns
              </Link>
            </li>
          </ul>
        </div>

        {/** Social Links Section */}
        <div className='space-y-4'>
          <h3 className='text-xl font-semibold text-gray-800'>Follow Us</h3>
          <div className='flex items-center space-x-4'>
            <a
              href='https://www.facebook.com'
              target='_blank'
              rel='noopener noreferrer'
              className='text-gray-600 hover:text-gray-900 transition-colors'
            >
              <TbBrandMeta className='h-6 w-6' />
            </a>
            <a
              href='https://www.instagram.com'
              target='_blank'
              rel='noopener noreferrer'
              className='text-gray-600 hover:text-gray-900 transition-colors'
            >
              <IoLogoInstagram className='h-6 w-6' />
            </a>
            <a
              href='https://www.twitter.com'
              target='_blank'
              rel='noopener noreferrer'
              className='text-gray-600 hover:text-gray-900 transition-colors'
            >
              <RiTwitterXLine className='h-6 w-6' />
            </a>
          </div>
          <div className='mt-4'>
            <p className='text-gray-600'>Call Us</p>
            <div className='flex items-center space-x-2'>
              <FiPhoneCall className='h-5 w-5 text-gray-600' />
              <p className='text-gray-600'>+39 (333) 219-000-6</p>
            </div>
          </div>
        </div>
      </div>

      {/** Copyright Section */}
      <div className='container mx-auto mt-12 px-4 lg:px-0 border-t border-gray-200 pt-6'>
        <p className='text-center text-gray-500 text-sm'>
          © 2023 Your Company. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
