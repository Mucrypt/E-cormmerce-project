import { useState, useRef, useEffect } from 'react'
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa6'

const NewArrivals = () => {
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [showLeftButton, setShowLeftButton] = useState(false)
  const [showRightButton, setShowRightButton] = useState(true)
  const scrollContainerRef = useRef(null)

  const NewArrivals = [
    {
      _id: '1',
      name: 'Stylish Jacket',
      price: 149.99,
      images: [
        {
          url: 'https://picsum.photos/id/1/500?random=1',
          altText: 'Stylish Jacket',
        },
      ],
    },
    {
      _id: '2',
      name: 'Trendy T-shirt',
      price: 49.99,
      images: [
        {
          url: 'https://picsum.photos/id/2/500?random=2',
          altText: 'Trendy T-shirt',
        },
      ],
    },
    {
      _id: '3',
      name: 'Stylish Jacket',
      price: 149.99,
      images: [
        {
          url: 'https://picsum.photos/id/3/500?random=3',
          altText: 'Stylish Jacket',
        },
      ],
    },
    {
      _id: '4',
      name: 'Trendy T-shirt',
      price: 49.99,
      images: [
        {
          url: 'https://picsum.photos/id/4/500?random=4',
          altText: 'Trendy T-shirt',
        },
      ],
    },
    {
      _id: '5',
      name: 'Stylish Jacket',
      price: 149.99,
      images: [
        {
          url: 'https://picsum.photos/id/5/500?random=5',
          altText: 'Stylish Jacket',
        },
      ],
    },
    {
      _id: '6',
      name: 'Trendy T-shirt',
      price: 49.99,
      images: [
        {
          url: 'https://picsum.photos/id/6/500?random=6',
          altText: 'Trendy T-shirt',
        },
      ],
    },
    {
      _id: '7',
      name: 'Stylish Jacket',
      price: 149.99,
      images: [
        {
          url: 'https://picsum.photos/id/7/500?random=7',
          altText: 'Stylish Jacket',
        },
      ],
    },
    {
      _id: '8',
      name: 'Trendy T-shirt',
      price: 49.99,
      images: [
        {
          url: 'https://picsum.photos/id/8/500?random=8',
          altText: 'Trendy T-shirt',
        },
      ],
    },
  ]

  // Handle mouse down event to start dragging
  const handleMouseDown = (e) => {
    setIsDragging(true)
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft)
    setScrollLeft(scrollContainerRef.current.scrollLeft)
  }

  // Handle mouse leave event to stop dragging
  const handleMouseLeave = () => {
    setIsDragging(false)
  }

  // Handle mouse up event to stop dragging
  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Handle mouse move event to scroll while dragging
  const handleMouseMove = (e) => {
    if (!isDragging) return
    e.preventDefault()
    const x = e.pageX - scrollContainerRef.current.offsetLeft
    const walk = (x - startX) * 2 // Scroll speed
    scrollContainerRef.current.scrollLeft = scrollLeft - walk
  }

  // Scroll left
  const scrollLeftHandler = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' })
    }
  }

  // Scroll right
  const scrollRightHandler = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' })
    }
  }

  // Check if the container can scroll left or right
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

  // Update scroll buttons on scroll
  useEffect(() => {
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener('scroll', updateScrollButtons)
      return () => container.removeEventListener('scroll', updateScrollButtons)
    }
  }, [])

  return (
    <section className='py-12'>
      <div className='container mx-auto text-center mb-10 relative bg-green-50'>
        <h2 className='text-3xl font-bold mb-4'>Explore New Arrivals</h2>
        <p className='text-gray-600 text-lg mb-8'>
          Shop the latest products that have just arrived at our store.
        </p>
      </div>

      {/** Scrollable Content Container */}
      <div className='container mx-auto relative'>
        {/** Scroll Buttons */}
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

        {/** Scrollable Content */}
        <div
          ref={scrollContainerRef}
          className='overflow-x-auto scroll-smooth scrollbar-hide scroll-snap-x mandatory'
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          <div className='flex space-x-6 px-6 py-4'>
            {NewArrivals.map((product) => (
              <div
                key={product._id}
                className='w-64 flex-shrink-0 relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 scroll-snap-align-start'
              >
                <img
                  src={product.images[0].url}
                  alt={product.images[0].altText}
                  className='w-full h-64 object-cover transform transition-transform duration-500 group-hover:scale-105'
                />
                <div className='p-4 bg-white'>
                  <h3 className='text-lg font-semibold text-gray-800 mb-2'>
                    {product.name}
                  </h3>
                  <p className='text-gray-600'>${product.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default NewArrivals
