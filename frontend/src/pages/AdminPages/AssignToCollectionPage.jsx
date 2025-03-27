import { useEffect, useState } from 'react'
import axios from 'axios'
import LoadingSpinner from '../../components/LoadingSpinner'
//import { useSelector } from 'react-redux'

const AssignToCollectionPage = () => {
  const [products, setProducts] = useState([])
  const [collections, setCollections] = useState([])
  const [selectedCollection, setSelectedCollection] = useState('')
  const [selectedProducts, setSelectedProducts] = useState([])
  

  const [page, setPage] = useState(1)
  const [limit] = useState(12)
  const [totalPages, setTotalPages] = useState(1)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        const [productsRes, categoriesRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products`, {
            params: { limit, page },
          }),
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/categories`),
        ])

        const allCollections = categoriesRes.data.flatMap(
          (cat) => cat.collections || []
        )

        setProducts(productsRes.data.products || [])
        setTotalPages(productsRes.data.totalPages || 1)
        setCollections(allCollections)
        setError(null)
      } catch (err) {
        console.error('Failed to fetch data:', err)
        setError('Failed to load products or collections.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [page, limit])

  const handleCheckbox = (productId) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    )
  }

  const handleAssign = async () => {
    if (!selectedCollection) return alert('Select a collection first')
    if (selectedProducts.length === 0)
      return alert('Select at least one product')

    try {
      for (let id of selectedProducts) {
        await axios.put(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/products/${id}/collections/add`,
          { collection: selectedCollection },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            },
          }
        )
      }

      alert('Products added to collection successfully!')
      setSelectedProducts([])
    } catch (err) {
      console.error('Error assigning products:', err)
      alert('Failed to assign some products. Check console for details.')
    }
  }

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1)
  }

  const handleNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1)
  }

  if (loading)
    if (loading)
      return <LoadingSpinner message='Preparing awesomeness for you...' />

  if (error) return <p className='p-6 text-red-500'>{error}</p>

  return (
    <div className='p-6 bg-gray-50 rounded-lg shadow-md overflow-y-auto max-h-[calc(100vh-200px)]'>
      <h2 className='text-3xl font-bold mb-6 text-gray-800'>
        Assign Products to Collection
      </h2>

      {/* Collection Select */}
      <div className='mb-6'>
        <label className='mr-2 font-semibold text-gray-700'>
          Select Collection:
        </label>
        <select
          className='border border-gray-300 px-3 py-2 rounded bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-defaul-button'
          value={selectedCollection}
          onChange={(e) => setSelectedCollection(e.target.value)}
        >
          <option value=''>-- Choose a collection --</option>
          {collections.map((col) => (
            <option key={col._id} value={col.name}>
              {col.name}
            </option>
          ))}
        </select>
      </div>

      {/* Product List */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {products.map((product) => (
          <div
            key={product._id}
            className='bg-white border rounded shadow hover:shadow-md transition-all duration-300 p-4 flex items-center space-x-4'
          >
            <input
              type='checkbox'
              checked={selectedProducts.includes(product._id)}
              onChange={() => handleCheckbox(product._id)}
              className='accent-defaul-button scale-125'
            />
            <img
              src={product.images?.[0]?.url}
              alt={product.name}
              className='w-16 h-16 object-cover rounded shadow-sm'
            />
            <div>
              <p className='font-semibold text-gray-800'>{product.name}</p>
              <p className='text-sm text-gray-500'>${product.price}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className='mt-8 flex justify-between items-center'>
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className='px-4 py-2 rounded bg-defaul-button hover:bg-hero-button-hover text-white disabled:opacity-50 disabled:cursor-not-allowed'
        >
          Previous
        </button>
        <span className='text-sm text-gray-600'>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={page === totalPages}
          className='px-4 py-2 rounded bg-defaul-button hover:bg-hero-button-hover text-white disabled:opacity-50 disabled:cursor-not-allowed'
        >
          Next
        </button>
      </div>

      {/* Assign Button */}
      <button
        onClick={handleAssign}
        className='mt-8 bg-defaul-button hover:bg-hero-button-hover text-white px-6 py-3 rounded shadow transition duration-300'
      >
        Add Selected Products to Collection
      </button>
    </div>
  )
}

export default AssignToCollectionPage
