import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'

const FeaturedCategories = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showLeftButton, setShowLeftButton] = useState(false)
  const [showRightButton, setShowRightButton] = useState(true)
  const scrollContainerRef = useRef(null)

  // Fetch categories from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/categories`
        )
        setCategories(response.data)
      } catch (error) {
        console.error('Error fetching categories:', error)
        setError(error.response?.data?.message || 'Failed to fetch categories')
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  // Handle scroll buttons visibility
  const updateScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current
      setShowLeftButton(scrollLeft > 0)
      setShowRightButton(scrollLeft < scrollWidth - clientWidth)
    }
  }

  // Scroll left handler
  const scrollLeftHandler = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' })
    }
  }

  // Scroll right handler
  const scrollRightHandler = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' })
    }
  }

  // Attach scroll event listener
  useEffect(() => {
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener('scroll', updateScrollButtons)
      return () => container.removeEventListener('scroll', updateScrollButtons)
    }
  }, [categories])

  // Skeleton Loading Component
  const SkeletonLoader = () => {
    return (
      <div className='w-64 flex-shrink-0 relative h-64 rounded-xl overflow-hidden bg-gray-200 animate-pulse'>
        <div className='absolute inset-0 flex flex-col items-center justify-center'>
          <div className='h-8 w-24 bg-gray-300 rounded mb-4'></div>
          <div className='h-10 w-32 bg-gray-300 rounded'></div>
        </div>
      </div>
    )
  }

  if (error) {
    return <p>Error: {error}</p>
  }

  return (
    <section className='py-16 bg-green-50'>
      <div className='container mx-auto px-4'>
        <h2 className='text-3xl lg:text-4xl font-bold text-center mb-8'>
          Featured Categories
        </h2>

        <div className='relative'>
          {/* Left Scroll Button */}
          {showLeftButton && (
            <div className='absolute top-1/2 left-0 transform -translate-y-1/2 z-10'>
              <button
                onClick={scrollLeftHandler}
                className='p-3 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-colors'
                aria-label='Scroll left'
              >
                <FaAngleLeft className='text-2xl text-gray-800' />
              </button>
            </div>
          )}

          {/* Right Scroll Button */}
          {showRightButton && (
            <div className='absolute top-1/2 right-0 transform -translate-y-1/2 z-10'>
              <button
                onClick={scrollRightHandler}
                className='p-3 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-colors'
                aria-label='Scroll right'
              >
                <FaAngleRight className='text-2xl text-gray-800' />
              </button>
            </div>
          )}

          {/* Horizontal Scroll Container */}
          <div
            ref={scrollContainerRef}
            className='overflow-x-auto scroll-smooth scrollbar-hide scroll-snap-x mandatory'
          >
            <div className='flex space-x-6 px-6 py-4'>
              {loading ? (
                // Display skeleton loaders while loading
                [...Array(4)].map((_, index) => <SkeletonLoader key={index} />)
              ) : categories.length > 0 ? (
                // Display actual categories once loaded
                categories.map((category) => (
                  <div
                    key={category._id}
                    className='w-64 flex-shrink-0 relative h-64 rounded-xl overflow-hidden group transition-transform duration-300 hover:scale-105 scroll-snap-align-start'
                  >
                    <img
                      src={category.image} // Assuming `image` is a field in your category schema
                      alt={category.name}
                      className='w-full h-full object-cover'
                      loading='lazy'
                    />
                    <div className='absolute inset-0 bg-black bg-opacity-30 flex flex-col items-center justify-center'>
                      <h3 className='text-2xl font-bold text-white mb-2'>
                        {category.name}
                      </h3>
                      <Link
                        to={`/category/${category._id}`}
                        className='px-6 py-2 bg-defaul-button text-white mt-3 font-semibold rounded-lg hover:bg-opacity-90 transition-colors duration-300'
                      >
                        Shop Now
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <p className='text-center col-span-full'>
                  No categories found.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturedCategories
