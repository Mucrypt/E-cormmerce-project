import mensCollectionImage from '../../assets/men-collection.jpg'
import womensCollectionImage from '../../assets/women-collection.jpg'
import { Link } from 'react-router-dom'

const GenderCollection = () => {
  return (
    <section className='py-6 px-4 lg:px-8'>
      <div className='container mx-auto'>
        <div className='flex flex-col md:flex-row gap-8'>
          {/* Women's Collection */}
          <div className='w-full md:w-1/2 relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300'>
            <img
              src={womensCollectionImage}
              alt='Women’s Collection'
              className='w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105'
            />
            <div className='absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-30 p-6 text-center'>
              <h2 className='text-3xl md:text-4xl font-bold text-white mb-4'>
                Women’s Collection
              </h2>
              <Link
                to='/collections/all?gender=women'
                className='bg-defaul-button text-white font-semibold py-2 px-6 rounded-md shadow-lg hover:bg-hero-button-hover transition-colors transform hover:scale-105'
              >
                Shop Now
              </Link>
            </div>
          </div>

          {/* Men's Collection */}
          <div className='w-full md:w-1/2 relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300'>
            <img
              src={mensCollectionImage}
              alt='Men’s Collection'
              className='w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105'
            />
            <div className='absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-30 p-6 text-center'>
              <h2 className='text-3xl md:text-4xl font-bold text-white mb-4'>
                Men’s Collection
              </h2>
              <Link
                to='/collections/all?gender=men'
                className='bg-defaul-button text-white font-semibold py-2 px-6 rounded-md shadow-lg hover:bg-hero-button-hover transition-colors transform hover:scale-105'
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GenderCollection
