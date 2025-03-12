import { Link } from 'react-router-dom'

const FeaturedCollection = () => {
  return (
    <section className='py-20 px-4 lg:px-0'>
      <div className='container mx-auto'>
        <div className='flex flex-col-reverse lg:flex-row items-center bg-gradient-to-r from-green-100 to-green-50 rounded-3xl overflow-hidden  hover:shadow-3xl transition-shadow duration-500'>
          {/** Left Content */}
          <div className='lg:w-1/2 p-8 lg:p-12 text-center lg:text-left'>
            <h2 className='text-2xl md:text-3xl font-bold text-gray-800 mb-4'>
              Comfort and Style Collection 2025
            </h2>
            <h1 className='text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight'>
              Apparel Collection Made for Your Comfort and Style
            </h1>
            <p className='text-gray-600 mb-8 text-lg'>
              Discover the perfect blend of comfort and style with our exclusive
              2025 collection. Designed for the modern individual, our apparel
              ensures you look and feel your best every day.
            </p>
            <Link
              to='/collection/all'
              className='inline-block bg-defaul-button text-white py-3 px-8 rounded-lg font-semibold text-lg hover:bg-hero-button-hover transition-colors duration-300 transform hover:scale-105'
            >
              Shop Now
            </Link>
          </div>

          {/** Right Content */}
          <div className='lg:w-1/2 relative'>
            <img
              src='https://picsum.photos/id/204/800'
              alt='Collection'
              className='w-full h-full object-cover lg:rounded-tr-3xl lg:rounded-br-3xl transform transition-transform duration-500 hover:scale-105'
            />
            {/** Overlay for a professional touch */}
            <div className='absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-green-100 opacity-50'></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturedCollection
