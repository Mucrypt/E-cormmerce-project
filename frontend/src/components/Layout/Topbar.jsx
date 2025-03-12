import { TbBrandMeta } from 'react-icons/tb'
import { IoLogoInstagram } from 'react-icons/io'
import { RiTwitterXLine } from 'react-icons/ri'

const Topbar = () => {
  return (
    <div className='bg-top-red text-white   '>
      <div className='container mx-auto flex justify-between items-center py-3 px-4'>
        <div className=' items-center space-x-4 hidden md:flex'>
          <a href='#' className='hover:text-gray-300'>
            <TbBrandMeta className='h-6 w-6' />
          </a>
          <a href='#' className='hover:text-gray-300'>
            <IoLogoInstagram className='h-6 w-6' />
          </a>
          <a href='#' className='hover:text-gray-300'>
            <RiTwitterXLine className='h-6 w-6' />
          </a>
        </div>

        <div className='text-sm text-center flex-grow'>
          <span>We Ship Worldwide Fast and reliable shipping!</span>
        </div>

        <div className='text-sm hidden md:block'>
          <a href='tel:+1234567890' className='hover:text-gray-300'>
            +39 (333) 219-000-6
          </a>
        </div>
      </div>
    </div>
  )
}

export default Topbar
