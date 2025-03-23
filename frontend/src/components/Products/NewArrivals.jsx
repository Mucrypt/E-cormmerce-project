import { useState, useRef, useEffect } from 'react'
import { FaAngleRight, FaAngleLeft, FaStar, FaHeart } from 'react-icons/fa6'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const NewArrivals = () => {
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [showLeftButton, setShowLeftButton] = useState(false)
  const [showRightButton, setShowRightButton] = useState(true)
  const scrollContainerRef = useRef(null)

  const [NewArrivals, setNewArrivals] = useState([])
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`
        )
        setNewArrivals(response.data)
      } catch (error) {
        console.error('Error fetching new arrivals:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchNewArrivals()
  }, [])

  const handleMouseDown = (e) => {
    setIsDragging(true)
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft)
    setScrollLeft(scrollContainerRef.current.scrollLeft)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    e.preventDefault()
    const x = e.pageX - scrollContainerRef.current.offsetLeft
    const walk = (x - startX) * 2 // Scroll speed
    scrollContainerRef.current.scrollLeft = scrollLeft - walk
  }

  const scrollLeftHandler = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' })
    }
  }

  const scrollRightHandler = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' })
    }
  }

  const updateScrollButtons = () => {
    if (scrollContainerRef.current) {
      setShowLeftButton(scrollContainerRef.current.scrollLeft > 0)
      setShowRightButton(
        scrollContainerRef.current.scrollLeft <
          scrollContainerRef.current.scrollWidth -
            scrollContainerRef.current.clientWidth
      )
    }
  }

  useEffect(() => {
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener('scroll', updateScrollButtons)
      return () => container.removeEventListener('scroll', updateScrollButtons)
    }
  }, [NewArrivals])

  if (loading) {
    return <p>Loading new arrivals...</p>
  }

  return (
    <section className='py-12'>
      <div className='container mx-auto text-center mb-10 relative bg-green-50'>
        <h2 className='text-3xl font-bold mb-8'>Explore New Arrivals</h2>
        <p className='text-gray-600 text-lg mb-8'>
          Shop the latest products that have just arrived at our store.
        </p>
      </div>

      <div className='container mx-auto relative'>
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

        <div
          ref={scrollContainerRef}
          className='overflow-x-auto scroll-smooth scrollbar-hide scroll-snap-x mandatory'
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          <div className='flex space-x-6 px-6 py-4'>
            {NewArrivals.length > 0 ? (
              NewArrivals.map((product) => {
                const discountPercentage = Math.round(
                  ((product.price - product.discountPrice) / product.price) *
                    100
                )

                return (
                  <div
                    key={product._id}
                    className='w-64 flex-shrink-0 relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 scroll-snap-align-start'
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

                    <img
                      src={product.images[0].url}
                      alt={product.images[0].altText}
                      className='w-full h-64 object-cover transform transition-transform duration-500 group-hover:scale-105'
                    />

                    <div className='p-4 bg-white'>
                      <h3 className='text-lg font-semibold text-gray-800 mb-2'>
                        {product.name}
                      </h3>

                      <div className='flex items-center mb-2'>
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
                        <span className='text-sm text-gray-600 ml-2'>
                          ({product.numReviews} reviews)
                        </span>
                      </div>

                      <div className='flex items-center mb-2'>
                        {product.discountPrice ? (
                          <>
                            <span className='text-lg font-bold text-gray-800'>
                              ${product.discountPrice.toFixed(2)}
                            </span>
                            <span className='text-sm text-gray-500 line-through ml-2'>
                              ${product.price.toFixed(2)}
                            </span>
                          </>
                        ) : (
                          <span className='text-lg font-bold text-gray-800'>
                            ${product.price.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })
            ) : (
              <p>No new arrivals found.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default NewArrivals
