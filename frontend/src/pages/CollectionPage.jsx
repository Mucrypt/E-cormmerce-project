import { useEffect, useRef, useState } from 'react'
import { FaFilter } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import FilterSidebar from '../components/Products/FilterSidebar'
import SortOption from '../components/Products/SortOption'
import { fetchProductsByCollection } from '../redux/slices/collectionsSlice'
import LoadingSpinner from '../components/LoadingSpinner'

const CollectionPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [sortBy, setSortBy] = useState('')
  const sidebarRef = useRef(null)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { collectionId } = useParams()

  const { productsByCollection, loading, error } = useSelector(
    (state) => state.collections
  )

  useEffect(() => {
    if (collectionId) {
      dispatch(fetchProductsByCollection(collectionId))
    }
  }, [collectionId, dispatch])

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

  const sortedProducts = [...productsByCollection].sort((a, b) => {
    if (sortBy === 'price_asc') return a.price - b.price
    if (sortBy === 'price_desc') return b.price - a.price
    if (sortBy === 'newest')
      return new Date(b.createdAt) - new Date(a.createdAt)
    return 0
  })

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`)
  }
  console.log(productsByCollection)

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
          collections={[]} // You can pass real filters if needed
          onClose={() => setIsSidebarOpen(false)}
        />
      </div>

      <div className='flex-grow p-4'>
        <div className='flex justify-between items-center mb-6'>
          <h1 className='text-2xl sm:text-3xl font-bold'>
            Collection Products
          </h1>
          <SortOption sortBy={sortBy} setSortBy={setSortBy} />
        </div>

        {loading ? (
          <LoadingSpinner message='Preparing awesomeness for you...' />
        ) : error ? (
          <p className='text-red-500'>Error: {error}</p>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {sortedProducts.map((product) => (
              <div
                key={product._id}
                className='bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer'
                onClick={() => handleProductClick(product._id)}
              >
                <img
                  src={product.images[0]?.url}
                  alt={product.images[0]?.altText || product.name}
                  className='w-full h-48 object-cover rounded-lg'
                />
                <h2 className='text-lg font-semibold mt-4'>{product.name}</h2>
                <p className='text-gray-600'>${product.price.toFixed(2)}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default CollectionPage
