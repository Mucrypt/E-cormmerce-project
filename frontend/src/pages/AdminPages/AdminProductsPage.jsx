import React, { useState } from 'react'
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
  // Mock data for products
  const [products, setProducts] = useState([
    {
      _id: '64f8e8b7e4b0d1a2b3c4d5e6', // Use _id instead of id for MongoDB compatibility
      name: 'Product A',
      description: 'High-quality product for everyday use.',
      price: 19.99,
      stock: 100,
      category: 'Clothing',
      images: [
        'https://picsum.photos/id/204/800',
        'https://picsum.photos/id/205/800',
      ],
      status: 'Active',
      attributes: {
        size: ['M', 'L'],
        color: ['Blue', 'Red'],
        material: 'Cotton',
      },
    },
    {
      _id: '64f8e8b7e4b0d1a2b3c4d5e7', // Use _id instead of id for MongoDB compatibility
      name: 'Product B',
      description: 'Premium product with advanced features.',
      price: 29.99,
      stock: 50,
      category: 'Car Parts',
      images: ['https://picsum.photos/id/206/800'],
      status: 'Inactive',
      attributes: {
        specifications: 'High-performance',
        weight: '5kg',
        dimensions: '10x10x10cm',
      },
    },
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentProduct, setCurrentProduct] = useState({
    _id: '', // Use _id instead of id for MongoDB compatibility
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

  const toggleAttributes = (id) => {
    setShowAttributes((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const openAddModal = () => {
    setCurrentProduct({
      _id: '', // Use _id instead of id for MongoDB compatibility
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

  const handleSaveProduct = (newProduct) => {
    if (newProduct._id) {
      // Edit existing product
      setProducts(
        products.map((prod) =>
          prod._id === newProduct._id ? newProduct : prod
        )
      )
    } else {
      // Add new product
      setProducts([...products, { ...newProduct, _id: String(Math.random()) }])
    }
    closeModal()
  }

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter((prod) => prod._id !== id))
    }
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    const matchesCategory = filterCategory
      ? product.category === filterCategory
      : true
    return matchesSearch && matchesCategory
  })

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-semibold mb-6'>Manage Products</h1>
      <div className='bg-white p-6 rounded-lg shadow-md'>
        <div className='flex justify-between mb-4'>
          <div className='flex items-center space-x-4'>
            <div className='relative'>
              <input
                type='text'
                placeholder='Search products...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='p-2 border rounded-md pl-10'
              />
              <FaSearch className='absolute left-3 top-3 text-gray-500' />
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className='p-2 border rounded-md'
            >
              <option value=''>All Categories</option>
              {[...new Set(products.map((product) => product.category))].map(
                (category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                )
              )}
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

        <table className='w-full'>
          <thead>
            <tr className='border-b'>
              <th className='text-left p-2'>ID</th>
              <th className='text-left p-2'>Name</th>
              <th className='text-left p-2'>Description</th>
              <th className='text-left p-2'>Price</th>
              <th className='text-left p-2'>Stock</th>
              <th className='text-left p-2'>Category</th>
              <th className='text-left p-2'>Images</th>
              <th className='text-left p-2'>Status</th>
              <th className='text-left p-2'>Attributes</th>
              <th className='text-left p-2'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <React.Fragment key={product._id}>
                <tr className='border-b hover:bg-gray-50 transition-colors'>
                  <td className='p-2'>{product._id}</td>
                  <td className='p-2'>{product.name}</td>
                  <td className='p-2'>{product.description}</td>
                  <td className='p-2'>${product.price}</td>
                  <td className='p-2'>{product.stock}</td>
                  <td className='p-2'>{product.category}</td>
                  <td className='p-2'>
                    <div className='flex gap-2'>
                      {product.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`Product ${product.name} image ${index}`}
                          className='w-12 h-12 object-cover rounded'
                        />
                      ))}
                    </div>
                  </td>
                  <td className='p-2'>{product.status}</td>
                  <td className='p-2'>
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
                  <td className='p-2 flex space-x-2'>
                    <button
                      onClick={() => openEditModal(product)}
                      className='text-yellow-500 hover:text-yellow-700 bg-blue-100 px-2 py-1 rounded-md flex items-center space-x-1'
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
                    <td colSpan='10' className='p-2 bg-gray-50'>
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
              </React.Fragment>
            ))}
          </tbody>
        </table>
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
