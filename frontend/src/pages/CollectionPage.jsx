import { useEffect, useRef, useState } from 'react'
import { FaFilter } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom' // Import useNavigate
import FilterSidebar from '../components/Products/FilterSidebar'
import SortOption from '../components/Products/SortOption'

const CollectionPage = () => {
  const [collections, setCollections] = useState([])
  const sidebarRef = useRef(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [sortBy, setSortBy] = useState('')
  const navigate = useNavigate() // Initialize useNavigate

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handleOutsideClick = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSidebarOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [])

  useEffect(() => {
    setTimeout(() => {
      const fetchedCollections = [
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
          name: 'Casual Pants',
          price: 79.99,
          images: [
            {
              url: 'https://picsum.photos/id/3/500?random=3',
              altText: 'Casual Pants',
            },
          ],
        },
        // Add more collections as needed
      ]
      setCollections(fetchedCollections)
    }, 1000)
  }, [])

  // Sort collections based on the selected option
  const sortedCollections = [...collections].sort((a, b) => {
    if (sortBy === 'price_asc') return a.price - b.price
    if (sortBy === 'price_desc') return b.price - a.price
    if (sortBy === 'newest')
      return new Date(b.createdAt) - new Date(a.createdAt)
    return 0
  })

  // Handle product click
  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`) // Navigate to product details page
  }

  return (
    <div className='flex flex-col lg:flex-row'>
      {/** Mobile Filter Button */}
      <button
        onClick={handleSidebarToggle}
        className='lg:hidden border p-2 flex items-center justify-center'
      >
        <FaFilter className='mr-2' /> Filters
      </button>

      {/** Filter Sidebar */}
      <div
        ref={sidebarRef}
        className={`${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed inset-y-0 z-40 left-0 bg-green-50 overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0 lg:z-0`}
      >
        <FilterSidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/** Main Content */}
      <div className='flex-grow p-4'>
        {/** Top Bar with Sort Option */}
        <div className='flex justify-between items-center mb-6'>
          <h1 className='text-2xl sm:text-3xl font-bold'>All Collections</h1>
          <SortOption sortBy={sortBy} setSortBy={setSortBy} />
        </div>

        {/** Product Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {sortedCollections.map((collection) => (
            <div
              key={collection._id}
              className='bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer'
              onClick={() => handleProductClick(collection._id)} // Add click handler
            >
              <img
                src={collection.images[0].url}
                alt={collection.images[0].altText}
                className='w-full h-48 object-cover rounded-lg'
              />
              <h2 className='text-lg font-semibold mt-4'>{collection.name}</h2>
              <p className='text-gray-600'>${collection.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CollectionPage
