import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaSearch,
  FaChevronDown,
  FaChevronUp,
} from 'react-icons/fa'
import { useState } from 'react'
import uploadImage from '../../utils/uploadImage'

// Define category-specific attributes with options
const CATEGORY_ATTRIBUTES = {
  Clothing: {
    size: ['S', 'M', 'L', 'XL'],
    color: ['Red', 'Blue', 'Green', 'Black'],
    material: ['Cotton', 'Polyester', 'Wool'],
  },
  'Car Parts': {
    specifications: ['High-performance', 'Standard'],
    weight: ['5kg', '10kg', '15kg'],
    dimensions: ['10x10x10cm', '20x20x20cm'],
  },
  'Construction Tools': {
    power_source: ['Electric', 'Battery', 'Manual'],
    warranty: ['1 Year', '2 Years', 'Lifetime'],
    usage: ['Heavy-duty', 'Light-duty'],
  },
}

const AdminProductsPage = () => {
  // State for products
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Product A',
      description: 'High-quality product for everyday use.',
      price: '$19.99',
      stock: 100,
      category: 'Clothing',
      image: 'https://via.placeholder.com/150',
      status: 'Active',
      attributes: {
        size: ['M', 'L'],
        color: ['Blue', 'Red'],
        material: 'Cotton',
      },
    },
    {
      id: 2,
      name: 'Product B',
      description: 'Premium product with advanced features.',
      price: '$29.99',
      stock: 50,
      category: 'Car Parts',
      image: 'https://via.placeholder.com/150',
      status: 'Inactive',
      attributes: {
        specifications: 'High-performance',
        weight: '5kg',
        dimensions: '10x10x10cm',
      },
    },
  ])

  // State for the add/edit product modal
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentProduct, setCurrentProduct] = useState({
    id: '',
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    image: '',
    status: 'Active',
    attributes: {},
  })

  // State for image upload
  const [isUploading, setIsUploading] = useState(false)

  // State for search and filters
  const [searchQuery, setSearchQuery] = useState('')
  const [filterCategory, setFilterCategory] = useState('')

  // State to track which product's attributes are visible
  const [showAttributes, setShowAttributes] = useState({})

  // Toggle attribute visibility
  const toggleAttributes = (id) => {
    setShowAttributes((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  // Open the add product modal
  const openAddModal = () => {
    setCurrentProduct({
      id: '',
      name: '',
      description: '',
      price: '',
      stock: '',
      category: '',
      image: '',
      status: 'Active',
      attributes: {},
    })
    setIsModalOpen(true)
  }

  // Open the edit modal
  const openEditModal = (product) => {
    setCurrentProduct(product)
    setIsModalOpen(true)
  }

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false)
  }

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCurrentProduct({ ...currentProduct, [name]: value })
  }

  // Handle attribute changes
  const handleAttributeChange = (e, attribute) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (option) => option.value
    )
    setCurrentProduct({
      ...currentProduct,
      attributes: {
        ...currentProduct.attributes,
        [attribute]: selectedOptions,
      },
    })
  }

  // Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setIsUploading(true)
    const data = await uploadImage(file)
    if (data) {
      setCurrentProduct({ ...currentProduct, image: data.secure_url })
    }
    setIsUploading(false)
  }

  // Handle adding/editing a product
  const handleSaveProduct = () => {
    if (!currentProduct.name || !currentProduct.price || !currentProduct.stock)
      return

    const newProduct = {
      ...currentProduct,
      id: currentProduct.id || products.length + 1,
      stock: parseInt(currentProduct.stock, 10),
      price: `$${parseFloat(currentProduct.price).toFixed(2)}`,
    }

    if (currentProduct.id) {
      // Edit existing product
      setProducts(
        products.map((prod) =>
          prod.id === currentProduct.id ? newProduct : prod
        )
      )
    } else {
      // Add new product
      setProducts([...products, newProduct])
    }

    closeModal()
  }

  // Handle deleting a product
  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter((prod) => prod.id !== id))
    }
  }

  // Filtered products based on search and category
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
        {/* Search and Filters */}
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
              {Object.keys(CATEGORY_ATTRIBUTES).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={openAddModal}
            className='bg-blue-600 text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-blue-700 transition-colors'
          >
            <FaPlus />
            <span>Add Product</span>
          </button>
        </div>

        {/* Products Table */}
        <table className='w-full'>
          <thead>
            <tr className='border-b'>
              <th className='text-left p-2'>ID</th>
              <th className='text-left p-2'>Name</th>
              <th className='text-left p-2'>Description</th>
              <th className='text-left p-2'>Price</th>
              <th className='text-left p-2'>Stock</th>
              <th className='text-left p-2'>Category</th>
              <th className='text-left p-2'>Image</th>
              <th className='text-left p-2'>Status</th>
              <th className='text-left p-2'>Attributes</th>
              <th className='text-left p-2'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id} className='border-b'>
                <td className='p-2'>{product.id}</td>
                <td className='p-2'>{product.name}</td>
                <td className='p-2'>{product.description}</td>
                <td className='p-2'>{product.price}</td>
                <td className='p-2'>{product.stock}</td>
                <td className='p-2'>{product.category}</td>
                <td className='p-2'>
                  <img
                    src={product.image}
                    alt={product.name}
                    className='w-12 h-12 object-cover rounded'
                  />
                </td>
                <td className='p-2'>{product.status}</td>
                <td className='p-2'>
                  <div
                    value={showAttributes[product.id]}
                    onClick={() => toggleAttributes(product.id)}
                    className='text-blue-500 hover:text-blue-700 flex items-center space-x-1'
                  >
                    {showAttributes[product.id] ? (
                      <FaChevronUp />
                    ) : (
                      <FaChevronDown />
                    )}

                    <span className='cursor-pointer'>Show</span>
                  </div>
                  {showAttributes[product.id] && (
                    <div className='mt-2'>
                      {Object.entries(product.attributes).map(
                        ([key, value]) => (
                          <div key={key}>
                            <strong>{key}:</strong>{' '}
                            {Array.isArray(value) ? value.join(', ') : value}
                          </div>
                        )
                      )}
                    </div>
                  )}
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
                    onClick={() => handleDeleteProduct(product.id)}
                    className='text-red-500 hover:text-red-700 bg-red-100 px-2 py-1 rounded-md flex items-center space-x-1'
                  >
                    <FaTrash />
                    <span>Delete</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Product Modal */}
      {isModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white p-6 rounded-lg shadow-md w-full max-w-2xl max-h-[90vh] overflow-y-auto'>
            <h2 className='text-xl font-semibold mb-4'>
              {currentProduct.id ? 'Edit Product' : 'Add Product'}
            </h2>
            <div className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Product Name
                </label>
                <input
                  type='text'
                  name='name'
                  value={currentProduct.name}
                  onChange={handleInputChange}
                  className='w-full p-2 border rounded-md'
                  placeholder='Enter product name'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Description
                </label>
                <textarea
                  name='description'
                  value={currentProduct.description}
                  onChange={handleInputChange}
                  className='w-full p-2 border rounded-md'
                  placeholder='Enter product description'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Price
                </label>
                <input
                  type='number'
                  name='price'
                  value={currentProduct.price}
                  onChange={handleInputChange}
                  className='w-full p-2 border rounded-md'
                  placeholder='Enter price'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Stock
                </label>
                <input
                  type='number'
                  name='stock'
                  value={currentProduct.stock}
                  onChange={handleInputChange}
                  className='w-full p-2 border rounded-md'
                  placeholder='Enter stock'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Category
                </label>
                <select
                  name='category'
                  value={currentProduct.category}
                  onChange={handleInputChange}
                  className='w-full p-2 border rounded-md'
                >
                  <option value=''>Select Category</option>
                  {Object.keys(CATEGORY_ATTRIBUTES).map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              {/* Dynamic Attributes */}
              {currentProduct.category &&
                Object.entries(
                  CATEGORY_ATTRIBUTES[currentProduct.category]
                ).map(([attribute, options]) => (
                  <div key={attribute}>
                    <label className='block text-sm font-medium text-gray-700'>
                      {attribute.charAt(0).toUpperCase() + attribute.slice(1)}
                    </label>
                    <select
                      multiple
                      value={currentProduct.attributes[attribute] || []}
                      onChange={(e) => handleAttributeChange(e, attribute)}
                      className='w-full p-2 border rounded-md'
                    >
                      {options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Image
                </label>
                <input
                  type='file'
                  accept='image/*'
                  onChange={handleImageUpload}
                  className='w-full p-2 border rounded-md'
                />
                {isUploading && (
                  <p className='text-sm text-gray-500'>Uploading image...</p>
                )}
                {currentProduct.image && (
                  <img
                    src={currentProduct.image}
                    alt='Preview'
                    className='w-12 h-12 object-cover rounded mt-2'
                  />
                )}
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Status
                </label>
                <select
                  name='status'
                  value={currentProduct.status}
                  onChange={handleInputChange}
                  className='w-full p-2 border rounded-md'
                >
                  <option value='Active'>Active</option>
                  <option value='Inactive'>Inactive</option>
                </select>
              </div>
              <div className='flex justify-end space-x-4'>
                <button
                  onClick={closeModal}
                  className='bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors'
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveProduct}
                  className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors'
                >
                  {currentProduct.id ? 'Save Changes' : 'Add Product'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminProductsPage
