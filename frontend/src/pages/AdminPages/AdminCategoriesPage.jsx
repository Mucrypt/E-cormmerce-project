import React, { useState } from 'react'
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaChevronDown,
  FaChevronUp,
} from 'react-icons/fa'
import uploadImage from '../../utils/uploadImage'

const AdminCategoriesPage = () => {
  // Mock data for categories
  const [categories, setCategories] = useState([
    {
      _id: '64f8e8b7e4b0d1a2b3c4d5e6', // Use _id instead of id for MongoDB compatibility
      name: 'Electronics',
      description: 'Devices and gadgets for everyday use.',
      subcategories: ['Mobile Phones', 'Laptops'],
      image: 'https://picsum.photos/id/204/800',
      status: 'Active',
      productCount: 120,
    },
    {
      _id: '64f8e8b7e4b0d1a2b3c4d5e7', // Use _id instead of id for MongoDB compatibility
      name: 'Clothing',
      description: 'Fashionable apparel for men and women.',
      subcategories: ['Men', 'Women'],
      image: 'https://picsum.photos/id/204/800',
      status: 'Active',
      productCount: 200,
    },
  ])

  // State to track which category's subcategories are visible
  const [showSubcategories, setShowSubcategories] = useState({})

  // State for the add/edit category modal
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentCategory, setCurrentCategory] = useState({
    _id: '', // Use _id instead of id for MongoDB compatibility
    name: '',
    description: '',
    subcategories: '',
    image: '',
    status: 'Active',
    productCount: 0,
  })

  // State for image upload
  const [isUploading, setIsUploading] = useState(false)

  // Open the add category modal
  const openAddModal = () => {
    setCurrentCategory({
      _id: '', // Use _id instead of id for MongoDB compatibility
      name: '',
      description: '',
      subcategories: '',
      image: '',
      status: 'Active',
      productCount: 0,
    })
    setIsModalOpen(true)
  }

  // Open the edit modal
  const openEditModal = (category) => {
    setCurrentCategory({
      ...category,
      subcategories: category.subcategories.join(', '), // Convert array to comma-separated string
    })
    setIsModalOpen(true)
  }

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false)
  }

  // Toggle subcategory visibility
  const toggleSubcategories = (id) => {
    setShowSubcategories((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCurrentCategory({ ...currentCategory, [name]: value })
  }

  // Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setIsUploading(true)
    const data = await uploadImage(file)
    if (data) {
      setCurrentCategory({ ...currentCategory, image: data.secure_url })
    }
    setIsUploading(false)
  }

  // Handle adding/editing a category
  const handleSaveCategory = () => {
    if (!currentCategory.name || !currentCategory.description) return

    const newCategory = {
      ...currentCategory,
      _id: currentCategory._id || String(Math.random()), // Use _id instead of id for MongoDB compatibility
      subcategories: currentCategory.subcategories
        .split(',')
        .map((s) => s.trim()), // Convert comma-separated string to array
      productCount: parseInt(currentCategory.productCount, 10),
    }

    if (currentCategory._id) {
      // Edit existing category
      setCategories(
        categories.map((cat) =>
          cat._id === currentCategory._id ? newCategory : cat
        )
      )
    } else {
      // Add new category
      setCategories([...categories, newCategory])
    }

    closeModal()
  }

  // Handle deleting a category
  const handleDeleteCategory = (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      setCategories(categories.filter((cat) => cat._id !== id))
    }
  }

  return (
    <div className='p-6 bg-gray-50 min-h-screen'>
      <h1 className='text-2xl font-semibold mb-6 text-gray-800'>
        Manage Categories
      </h1>
      <div className='bg-white p-6 rounded-lg shadow-md'>
        <div className='flex justify-end mb-4'>
          <button
            onClick={openAddModal}
            className='bg-defaul-button-colors text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-red-600 transition-colors'
          >
            <FaPlus />
            <span>Add Category</span>
          </button>
        </div>
        <table className='w-full'>
          <thead>
            <tr className='bg-gray-100 text-gray-700'>
              <th className='text-left p-3'>ID</th>
              <th className='text-left p-3'>Name</th>
              <th className='text-left p-3'>Description</th>
              <th className='text-left p-3'>Subcategories</th>
              <th className='text-left p-3'>Image</th>
              <th className='text-left p-3'>Status</th>
              <th className='text-left p-3'>Product Count</th>
              <th className='text-left p-3'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <React.Fragment key={category._id}>
                <tr className='border-b hover:bg-gray-50 transition-colors'>
                  <td className='p-3 text-gray-700'>{category._id}</td>
                  <td className='p-3 text-gray-700'>{category.name}</td>
                  <td className='p-3 text-gray-700'>{category.description}</td>
                  <td className='p-3 text-gray-700'>
                    <button
                      onClick={() => toggleSubcategories(category._id)}
                      className='flex items-center space-x-2 text-blue-500 hover:text-blue-700'
                    >
                      <span>Subcategories</span>
                      {showSubcategories[category._id] ? (
                        <FaChevronUp />
                      ) : (
                        <FaChevronDown />
                      )}
                    </button>
                  </td>
                  <td className='p-3'>
                    <img
                      src={category.image}
                      alt={category.name}
                      className='w-12 h-12 object-cover rounded'
                    />
                  </td>
                  <td className='p-3 text-gray-700'>{category.status}</td>
                  <td className='p-3 text-gray-700'>{category.productCount}</td>
                  <td className='p-2 flex space-x-2'>
                    <button
                      onClick={() => openEditModal(category)}
                      className='text-yellow-500 hover:text-yellow-700 bg-blue-100 px-2 py-1 rounded-md flex items-center space-x-1'
                    >
                      <FaEdit />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(category._id)}
                      className='text-red-500 hover:text-red-700 bg-red-100 px-2 py-1 rounded-md flex items-center space-x-1'
                    >
                      <FaTrash />
                      <span>Delete</span>
                    </button>
                  </td>
                </tr>
                {showSubcategories[category._id] && (
                  <tr>
                    <td colSpan='8' className='p-3 bg-gray-50'>
                      <div className='pl-6'>
                        <ul className='list-disc list-inside'>
                          {category.subcategories.map((subcategory, index) => (
                            <li key={index} className='text-gray-700'>
                              {subcategory}
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

      {/* Add/Edit Category Modal */}
      {isModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white p-6 rounded-lg shadow-xl w-full max-w-md'>
            <h2 className='text-xl font-semibold mb-4 text-gray-800'>
              {currentCategory._id ? 'Edit Category' : 'Add Category'}
            </h2>
            <div className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Category Name
                </label>
                <input
                  type='text'
                  name='name'
                  value={currentCategory.name}
                  onChange={handleInputChange}
                  className='w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='Enter category name'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Description
                </label>
                <textarea
                  name='description'
                  value={currentCategory.description}
                  onChange={handleInputChange}
                  className='w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='Enter category description'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Subcategories (comma-separated)
                </label>
                <input
                  type='text'
                  name='subcategories'
                  value={currentCategory.subcategories}
                  onChange={handleInputChange}
                  className='w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='Enter subcategories'
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
                {isUploading && (
                  <p className='text-sm text-gray-500 mt-1'>
                    Uploading image...
                  </p>
                )}
                {currentCategory.image && (
                  <img
                    src={currentCategory.image}
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
                  value={currentCategory.status}
                  onChange={handleInputChange}
                  className='w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                >
                  <option value='Active'>Active</option>
                  <option value='Inactive'>Inactive</option>
                </select>
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Product Count
                </label>
                <input
                  type='number'
                  name='productCount'
                  value={currentCategory.productCount}
                  onChange={handleInputChange}
                  className='w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='Enter product count'
                />
              </div>
              <div className='flex justify-end space-x-4'>
                <button
                  onClick={closeModal}
                  className='bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors'
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveCategory}
                  className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors'
                >
                  {currentCategory._id ? 'Save Changes' : 'Add Category'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminCategoriesPage
