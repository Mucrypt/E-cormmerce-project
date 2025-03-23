import { useEffect, useRef, useState } from 'react'
import { FaFilter } from 'react-icons/fa'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import FilterSidebar from '../components/Products/FilterSidebar'
import SortOption from '../components/Products/SortOption'
import axios from 'axios'

const CategoryPage = () => {
  const [collections, setCollections] = useState([])
  const [selectedCollection, setSelectedCollection] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const sidebarRef = useRef(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [sortBy, setSortBy] = useState('')
  const navigate = useNavigate()
  const { categoryId } = useParams()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const categoryName = queryParams.get('name') // Extract the category name from the URL

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/categories/${categoryId}/collections`
        )
        setCollections(response.data)
        setSelectedCollection(null)
      } catch (error) {
        console.error('Error fetching collections:', error)
        setError(error.response?.data?.message || 'Failed to fetch collections')
      } finally {
        setLoading(false)
      }
    }

    if (categoryId) {
      fetchCollections()
    }
  }, [categoryId])

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

  const handleCollectionClick = (collection) => {
    setSelectedCollection(collection)
    setIsSidebarOpen(false)
  }

  const filteredCollections = selectedCollection
    ? collections.filter(
        (collection) => collection._id === selectedCollection._id
      )
    : collections

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p className='text-center text-red-500'>Error: {error}</p>
  }

  return (
    <div className='flex flex-col lg:flex-row'>
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className='lg:hidden border p-2 flex items-center justify-center mb-4'
      >
        <FaFilter className='mr-2' /> Filters
      </button>

      <div
        ref={sidebarRef}
        className={`${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed inset-y-0 z-40 left-0 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0 lg:z-0 lg:w-72`}
      >
        <FilterSidebar
          collections={collections}
          onClose={() => setIsSidebarOpen(false)}
          onCollectionClick={handleCollectionClick}
        />
      </div>

      <div className='flex-grow p-4'>
        <div className='flex justify-between items-center mb-6'>
          {/* Display the selected category name */}
          <h1 className='text-2xl sm:text-3xl font-bold'>
            {categoryName || 'All Collections'}
          </h1>
          <SortOption sortBy={sortBy} setSortBy={setSortBy} />
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {filteredCollections.map((collection) => (
            <div
              key={collection._id}
              className='bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer'
              onClick={() => navigate(`/collections/${collection._id}`)}
            >
              <img
                src={collection?.image || 'https://via.placeholder.com/300'}
                alt={collection?.name}
                className='w-full h-48 object-cover rounded-lg'
              />
              <h2 className='text-lg font-semibold mt-4'>{collection.name}</h2>
              <p className='text-gray-600'>
                ${collection.price?.toFixed(2) || 'N/A'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CategoryPage
