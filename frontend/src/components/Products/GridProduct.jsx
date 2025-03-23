import { useState, useEffect } from 'react'
import { FaStar, FaHeart } from 'react-icons/fa'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const GridProduct = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products`,
          {
            params: {
              page: 1, // Default page
              limit: 8, // Default limit
            },
          }
        )
        setProducts(response.data.products)
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // Skeleton Loading Component
  const SkeletonLoader = () => {
    return (
      <div className='bg-white rounded-xl shadow-lg overflow-hidden animate-pulse'>
        <div className='relative h-64 bg-gray-200'></div>
        <div className='p-6'>
          <div className='h-6 bg-gray-200 rounded mb-4'></div>
          <div className='flex items-center mb-4'>
            <div className='flex space-x-1'>
              {[...Array(5)].map((_, i) => (
                <div key={i} className='h-5 w-5 bg-gray-200 rounded'></div>
              ))}
            </div>
            <div className='h-4 w-16 bg-gray-200 rounded ml-2'></div>
          </div>
          <div className='h-6 bg-gray-200 rounded mb-4'></div>
          <div className='h-10 bg-gray-200 rounded'></div>
        </div>
      </div>
    )
  }

  return (
    <section className='py-16 bg-gradient-to-b from-green-50 to-green-50'>
      <div className='container mx-auto px-4'>
        <h2 className='text-3xl lg:text-4xl font-bold text-center mb-8'>
          Explore More Products
        </h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {loading ? (
            // Display skeleton loaders while loading
            [...Array(8)].map((_, index) => <SkeletonLoader key={index} />)
          ) : products.length > 0 ? (
            // Display actual products once loaded
            products.map((product) => {
              const discountPercentage = Math.round(
                ((product.price - product.discountPrice) / product.price) * 100
              )

              return (
                <div
                  key={product._id}
                  className='bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden group'
                  onClick={() => navigate(`/product/${product._id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  {product.discountPrice && (
                    <div className='absolute top-2 right-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-full'>
                      {discountPercentage}% OFF
                    </div>
                  )}

                  <button className='absolute top-2 left-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors'>
                    <FaHeart className='text-gray-600' />
                  </button>

                  <div className='relative h-64 overflow-hidden'>
                    <img
                      src={product.images[0].url} // Assuming images is an array with a URL field
                      alt={product.images[0].altText || product.name}
                      className='w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105'
                    />
                  </div>

                  <div className='p-6'>
                    <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                      {product.name}
                    </h3>

                    <div className='flex items-center mb-4'>
                      <div className='flex text-yellow-400'>
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={
                              i < product.rating
                                ? 'fill-current'
                                : 'fill-gray-300'
                            }
                          />
                        ))}
                      </div>
                      <span className='text-sm text-gray-500 ml-2'>
                        ({product.numReviews} reviews)
                      </span>
                    </div>

                    <div className='flex items-center mb-4'>
                      {product.discountPrice ? (
                        <>
                          <span className='text-2xl font-bold text-[var(--color-primary)]'>
                            ${product.discountPrice.toFixed(2)}
                          </span>
                          <span className='text-sm text-gray-500 line-through ml-2'>
                            ${product.price.toFixed(2)}
                          </span>
                        </>
                      ) : (
                        <span className='text-2xl font-bold text-[var(--color-primary)]'>
                          ${product.price.toFixed(2)}
                        </span>
                      )}
                    </div>

                    <button className='w-full bg-defaul-button text-white py-3 rounded-lg hover:bg-hero-button-hover transition-colors shadow-lg hover:shadow-xl'>
                      Add to Cart
                    </button>
                  </div>
                </div>
              )
            })
          ) : (
            <p className='text-center col-span-full'>No products found.</p>
          )}
        </div>
      </div>
    </section>
  )
}

export default GridProduct
