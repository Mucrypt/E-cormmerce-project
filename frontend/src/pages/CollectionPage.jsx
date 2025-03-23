import { useEffect, useRef, useState } from 'react'
import { FaFilter } from 'react-icons/fa'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import FilterSidebar from '../components/Products/FilterSidebar'
import SortOption from '../components/Products/SortOption'
import axios from 'axios'

const CollectionPage = () => {
  const [collections, setCollections] = useState([])
  const sidebarRef = useRef(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [sortBy, setSortBy] = useState('')
  const navigate = useNavigate()
  const { categoryId } = useParams()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const categoryName = queryParams.get('name')

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
    const fetchCollections = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/categories/${categoryId}/collections`
        )
        setCollections(response.data)
      } catch (error) {
        console.error('Error fetching collections:', error)
      }
    }

    if (categoryId) {
      fetchCollections()
    }
  }, [categoryId])

  const sortedCollections = [...collections].sort((a, b) => {
    if (sortBy === 'price_asc') return a.price - b.price
    if (sortBy === 'price_desc') return b.price - a.price
    if (sortBy === 'newest')
      return new Date(b.createdAt) - new Date(a.createdAt)
    return 0
  })

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`)
  }

  return (
    <div className='flex flex-col lg:flex-row'>
      <button
        onClick={handleSidebarToggle}
        className='lg:hidden border p-2 flex items-center justify-center'
      >
        <FaFilter className='mr-2' /> Filters
      </button>

      <div
        ref={sidebarRef}
        className={`${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed inset-y-0 z-40 left-0 bg-green-50 overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0 lg:z-0`}
      >
        <FilterSidebar
          collections={collections}
          onClose={() => setIsSidebarOpen(false)}
          onCollectionClick={(collection) =>
            navigate(`/collections/${collection._id}`)
          }
        />
      </div>

      <div className='flex-grow p-4'>
        <div className='flex justify-between items-center mb-6'>
          <h1 className='text-2xl sm:text-3xl font-bold'>
            {categoryName || 'All Collections'}
          </h1>
          <SortOption sortBy={sortBy} setSortBy={setSortBy} />
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {sortedCollections.map((collection) => (
            <div
              key={collection._id}
              className='bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer'
              onClick={() => handleProductClick(collection._id)}
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
