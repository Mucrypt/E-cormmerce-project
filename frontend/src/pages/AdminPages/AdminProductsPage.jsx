import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  FaPlus,
  FaSearch,
  FaChevronUp,
  FaChevronDown,
  FaEdit,
  FaTrash,
} from 'react-icons/fa'
import AdminAddProduct from './AdminAddProduct'
import EditProducts from './EditProducts'

const AdminProductsPage = () => {
  const [products, setProducts] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentProduct, setCurrentProduct] = useState({
    _id: '',
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    images: [],
    status: 'Active',
    attributes: {},
  })
  const [searchQuery, setSearchQuery] = useState('')
  const [filterCategory, setFilterCategory] = useState('')
  const [showAttributes, setShowAttributes] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showAllImages, setShowAllImages] = useState({})

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products`
        )
        setProducts(response.data.products)
        setLoading(false)
      } catch (error) {
        setError(error.message)
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const toggleAttributes = (id) => {
    setShowAttributes((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const toggleShowAllImages = (id) => {
    setShowAllImages((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const openAddModal = () => {
    setCurrentProduct({
      _id: '',
      name: '',
      description: '',
      price: '',
      stock: '',
      category: '',
      images: [],
      status: 'Active',
      attributes: {},
    })
    setIsModalOpen(true)
  }

  const openEditModal = (product) => {
    setCurrentProduct(product)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handleSaveProduct = async (newProduct) => {
    try {
      if (newProduct._id) {
        // Update existing product
        const response = await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/${newProduct._id}`,
          newProduct
        )
        setProducts(
          products.map((prod) =>
            prod._id === newProduct._id ? response.data : prod
          )
        )
      } else {
        // Add new product
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/products`,
          newProduct
        )
        setProducts([...products, response.data])
      }
      closeModal()
    } catch (error) {
      setError(error.message)
    }
  }

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`
        )
        setProducts(products.filter((prod) => prod._id !== id))
      } catch (error) {
        setError(error.message)
      }
    }
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    const matchesCategory = filterCategory
      ? product.category?._id === filterCategory
      : true
    return matchesSearch && matchesCategory
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div className='p-6 bg-green-50 min-h-screen w-full pl-[80px]'>
      <h1 className='text-2xl font-semibold mb-6 text-gray-800'>
        Manage Products
      </h1>
      <div className='bg-green-50 p-6 rounded-lg shadow-md max-w-full'>
        <div className='flex justify-between mb-4'>
          <div className='flex items-center space-x-4'>
            <div className='relative'>
              <input
                type='text'
                placeholder='Search products...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='p-2 border rounded-md pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
              <FaSearch className='absolute left-3 top-3 text-gray-500' />
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className='p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              <option value=''>All Categories</option>
              {[
                ...new Set(products.map((product) => product.category?._id)),
              ].map((categoryId) => {
                const category = products.find(
                  (p) => p.category?._id === categoryId
                )?.category
                return (
                  <option key={categoryId} value={categoryId}>
                    {category?.name}
                  </option>
                )
              })}
            </select>
          </div>
          <button
            onClick={openAddModal}
            className='bg-defaul-button-colors text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-red-500 transition-colors'
          >
            <FaPlus />
            <span>Add Product</span>
          </button>
        </div>
        {/* Scrollable Table Container */}
        <div className='overflow-y-auto max-h-[calc(100vh-200px)]'>
          <table className='w-full'>
            <thead>
              <tr className='bg-gray-100'>
                <th className='text-left p-3 border-b border-gray-300'>Name</th>
                <th className='text-left p-3 border-b border-gray-300'>
                  Description
                </th>
                <th className='text-left p-3 border-b border-gray-300'>
                  Price
                </th>
                <th className='text-left p-3 border-b border-gray-300'>
                  Stock
                </th>
                <th className='text-left p-3 border-b border-gray-300'>
                  Category
                </th>
                <th className='text-left p-3 border-b border-gray-300'>
                  Images
                </th>
                <th className='text-left p-3 border-b border-gray-300'>
                  Status
                </th>
                <th className='text-left p-3 border-b border-gray-300'>
                  Attributes
                </th>
                <th className='text-left p-3 border-b border-gray-300'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <React.Fragment key={product._id}>
                  <tr className='hover:bg-gray-50 transition-colors'>
                    <td className='p-3 border-b border-gray-200'>
                      <a
                        href={`/shop/product/${product._id}`} // Link to the product page
                        className='font-bold underline hover:text-gray-500'
                      >
                        {product.name}
                      </a>
                    </td>
                    <td className='p-3 border-b border-gray-200'>
                      {product.description}
                    </td>
                    <td className='p-3 border-b border-gray-200'>
                      ${product.price}
                    </td>
                    <td className='p-3 border-b border-gray-200'>
                      {product.stock}
                    </td>
                    <td className='p-3 border-b border-gray-200'>
                      {product.category?.name}
                    </td>
                    <td className='p-3 border-b border-gray-200'>
                      <div className='flex gap-2'>
                        {product.images.slice(0, 1).map((image, index) => (
                          <img
                            key={index}
                            src={image.url}
                            alt={`Product ${product.name} image ${index}`}
                            className='w-12 h-12 object-cover rounded'
                          />
                        ))}
                        {product.images.length > 3 && (
                          <button
                            onClick={() => toggleShowAllImages(product._id)}
                            className='text-blue-500 hover:text-blue-700'
                          >
                            +{product.images.length - 3} more
                          </button>
                        )}
                      </div>
                    </td>
                    <td className='p-5 border-b border-gray-200'>
                      {product.status}
                    </td>
                    <td className='p-3 border-b border-gray-200'>
                      <button
                        onClick={() => toggleAttributes(product._id)}
                        className='flex items-center space-x-2 text-blue-500 hover:text-blue-700'
                      >
                        <span>Attributes</span>
                        {showAttributes[product._id] ? (
                          <FaChevronUp />
                        ) : (
                          <FaChevronDown />
                        )}
                      </button>
                    </td>
                    <td className='p-3 border-b border-gray-200 flex space-x-2'>
                      <button
                        onClick={() => openEditModal(product)}
                        className='text-yellow-500 hover:text-yellow-700 bg-yellow-100 px-2 py-1 rounded-md flex items-center space-x-1'
                      >
                        <FaEdit />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product._id)}
                        className='text-red-500 hover:text-red-700 bg-red-100 px-2 py-1 rounded-md flex items-center space-x-1'
                      >
                        <FaTrash />
                        <span>Delete</span>
                      </button>
                    </td>
                  </tr>
                  {showAttributes[product._id] && (
                    <tr>
                      <td colSpan='9' className='p-3 bg-gray-50'>
                        <div className='pl-6'>
                          <ul className='list-disc list-inside'>
                            {Object.entries(product.attributes).map(
                              ([key, value]) => (
                                <li key={key} className='text-gray-700'>
                                  <strong>{key}:</strong>{' '}
                                  {Array.isArray(value)
                                    ? value.join(', ')
                                    : value}
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      </td>
                    </tr>
                  )}
                  {showAllImages[product._id] && (
                    <tr>
                      <td colSpan='9' className='p-3 bg-gray-50'>
                        <div className='flex flex-wrap gap-2'>
                          {product.images.map((image, index) => (
                            <img
                              key={index}
                              src={image.url}
                              alt={`Product ${product.name} image ${index}`}
                              className='w-12 h-12 object-cover rounded'
                            />
                          ))}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen &&
        (currentProduct._id ? (
          <EditProducts
            product={currentProduct}
            onClose={closeModal}
            onSave={handleSaveProduct}
          />
        ) : (
          <AdminAddProduct
            product={currentProduct}
            onClose={closeModal}
            onSave={handleSaveProduct}
          />
        ))}
    </div>
  )
}

export default AdminProductsPage
