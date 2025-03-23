import React, { useState } from 'react'
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaChevronDown,
  FaChevronUp,
} from 'react-icons/fa'

const AdminCollectionsPage = () => {
  // Mock data for collections
  const [collections, setCollections] = useState([
    {
      _id: '1',
      name: 'Summer Collection',
      description: 'Trendy summer outfits for all occasions.',
      image: 'https://picsum.photos/id/1018/800',
      status: 'Active',
      products: ['Product 1', 'Product 2'],
    },
    {
      _id: '2',
      name: 'Winter Collection',
      description: 'Warm and cozy winter wear.',
      image: 'https://picsum.photos/id/1035/800',
      status: 'Active',
      products: ['Product 3', 'Product 4'],
    },
  ])

  // State to track which collection's products are visible
  const [showProducts, setShowProducts] = useState({})

  // State for the add/edit collection modal
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentCollection, setCurrentCollection] = useState({
    _id: '',
    name: '',
    description: '',
    image: '',
    status: 'Active',
    products: [],
  })

  // Open the add collection modal
  const openAddModal = () => {
    setCurrentCollection({
      _id: '',
      name: '',
      description: '',
      image: '',
      status: 'Active',
      products: [],
    })
    setIsModalOpen(true)
  }

  // Open the edit modal
  const openEditModal = (collection) => {
    setCurrentCollection({
      ...collection,
      products: collection.products.join(', '), // Convert array to comma-separated string
    })
    setIsModalOpen(true)
  }

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false)
  }

  // Toggle product visibility
  const toggleProducts = (id) => {
    setShowProducts((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCurrentCollection({ ...currentCollection, [name]: value })
  }

  // Handle image upload (mock implementation)
  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Simulate image upload
    const imageUrl = URL.createObjectURL(file)
    setCurrentCollection({ ...currentCollection, image: imageUrl })
  }

  // Handle adding/editing a collection
  const handleSaveCollection = () => {
    if (!currentCollection.name || !currentCollection.description) return

    const collectionData = {
      ...currentCollection,
      products: currentCollection.products.split(',').map((p) => p.trim()), // Convert comma-separated string to array
    }

    if (currentCollection._id) {
      // Edit existing collection
      setCollections((prev) =>
        prev.map((c) => (c._id === currentCollection._id ? collectionData : c))
      )
    } else {
      // Add new collection
      setCollections((prev) => [
        ...prev,
        { ...collectionData, _id: String(prev.length + 1) },
      ])
    }

    closeModal()
  }

  // Handle deleting a collection
  const handleDeleteCollection = (id) => {
    if (window.confirm('Are you sure you want to delete this collection?')) {
      setCollections((prev) => prev.filter((c) => c._id !== id))
    }
  }

  return (
    <div className='p-6 bg-green-50 min-h-screen'>
      <h1 className='text-2xl font-bold mb-6 text-gray-800'>
        Manage Collections
      </h1>
      <div className='bg-white p-6 rounded-lg shadow-md'>
        <div className='flex justify-end mb-4'>
          <button
            onClick={openAddModal}
            className='bg-blue-500 text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-blue-600 transition-colors'
          >
            <FaPlus />
            <span>Add Collection</span>
          </button>
        </div>
        {/* Scrollable Table Container */}
        <div className='overflow-y-auto max-h-[calc(100vh-200px)]'>
          <table className='w-full'>
            <thead>
              <tr className='bg-gray-100 text-gray-700'>
                <th className='text-left p-3'>Name</th>
                <th className='text-left p-3'>Description</th>
                <th className='text-left p-3'>Products</th>
                <th className='text-left p-3'>Image</th>
                <th className='text-left p-3'>Status</th>
                <th className='text-left p-3'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {collections.map((collection) => (
                <React.Fragment key={collection._id}>
                  <tr className='border-b hover:bg-gray-50 transition-colors'>
                    <td className='p-3 text-gray-700'>{collection.name}</td>
                    <td className='p-3 text-gray-700'>
                      {collection.description}
                    </td>
                    <td className='p-3 text-gray-700'>
                      <button
                        onClick={() => toggleProducts(collection._id)}
                        className='flex items-center space-x-2 text-blue-500 hover:text-blue-700'
                      >
                        <span>Products</span>
                        {showProducts[collection._id] ? (
                          <FaChevronUp />
                        ) : (
                          <FaChevronDown />
                        )}
                      </button>
                    </td>
                    <td className='p-3'>
                      <img
                        src={collection.image}
                        alt={collection.name}
                        className='w-12 h-12 object-cover rounded'
                      />
                    </td>
                    <td className='p-3 text-gray-700'>{collection.status}</td>
                    <td className='p-2 flex space-x-2'>
                      <button
                        onClick={() => openEditModal(collection)}
                        className='text-yellow-500 hover:text-yellow-700 bg-yellow-100 px-2 py-1 rounded-md flex items-center space-x-1'
                      >
                        <FaEdit />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDeleteCollection(collection._id)}
                        className='text-red-500 hover:text-red-700 bg-red-100 px-2 py-1 rounded-md flex items-center space-x-1'
                      >
                        <FaTrash />
                        <span>Delete</span>
                      </button>
                    </td>
                  </tr>
                  {showProducts[collection._id] && (
                    <tr>
                      <td colSpan='6' className='p-3 bg-gray-50'>
                        <div className='pl-6'>
                          <ul className='list-disc list-inside'>
                            {collection.products.map((product, index) => (
                              <li key={index} className='text-gray-700'>
                                {product}
                              </li>
                            ))}
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
      </div>

      {/* Add/Edit Collection Modal */}
      {isModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white p-6 rounded-lg shadow-xl w-full max-w-md'>
            <h2 className='text-xl font-semibold mb-4 text-gray-800'>
              {currentCollection._id ? 'Edit Collection' : 'Add Collection'}
            </h2>
            <div className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Collection Name
                </label>
                <input
                  type='text'
                  name='name'
                  value={currentCollection.name}
                  onChange={handleInputChange}
                  className='w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='Enter collection name'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Description
                </label>
                <textarea
                  name='description'
                  value={currentCollection.description}
                  onChange={handleInputChange}
                  className='w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='Enter collection description'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Products (comma-separated)
                </label>
                <input
                  type='text'
                  name='products'
                  value={currentCollection.products}
                  onChange={handleInputChange}
                  className='w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='Enter products'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Image
                </label>
                <input
                  type='file'
                  accept='image/*'
                  onChange={handleImageUpload}
                  className='w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
                {currentCollection.image && (
                  <img
                    src={currentCollection.image}
                    alt='Preview'
                    className='w-12 h-12 object-cover rounded mt-2'
                  />
                )}
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Status
                </label>
                <select
                  name='status'
                  value={currentCollection.status}
                  onChange={handleInputChange}
                  className='w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
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
                  onClick={handleSaveCollection}
                  className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors'
                >
                  {currentCollection._id ? 'Save Changes' : 'Add Collection'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminCollectionsPage
// The AdminCollectionsPage component is a functional component that displays a list of collections with their details. It also provides the ability to add new collections, edit existing collections, and delete collections. The component uses local state to manage the collections data, show/hide products, and control the add/edit collection modal.
