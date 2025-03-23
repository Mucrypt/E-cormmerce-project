import React, { useState, useEffect } from 'react'
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaChevronDown,
  FaChevronUp,
} from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../../redux/slices/categorySlice'
import uploadImage from '../../utils/uploadImage'

const AdminCategoriesPage = () => {
  const dispatch = useDispatch()
  const {
    categories = [],
    loading,
    error,
  } = useSelector((state) => state.categories)

  // State to track which category's subcategories are visible
  const [showSubcategories, setShowSubcategories] = useState({})

  // State for the add/edit category modal
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentCategory, setCurrentCategory] = useState({
    _id: '',
    name: '',
    description: '',
    subcategories: '',
    image: '',
    status: 'Active',
    productCount: 0,
  })

  // State for image upload
  const [isUploading, setIsUploading] = useState(false)

  // Fetch categories on component mount
  useEffect(() => {
    console.log('Fetching categories...')
    dispatch(fetchCategories())
  }, [dispatch])

  console.log('Categories:', categories)
  console.log('Loading:', loading)
  console.log('Error:', error)

  // Open the add category modal
  const openAddModal = () => {
    setCurrentCategory({
      _id: '',
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
      setCurrentCategory({ ...currentCategory, image: data.imageUrl })
    }
    setIsUploading(false)
  }

  // Handle adding/editing a category
  const handleSaveCategory = async () => {
    if (!currentCategory.name || !currentCategory.description) return

    const categoryData = {
      ...currentCategory,
      subcategories: currentCategory.subcategories
        .split(',')
        .map((s) => s.trim()), // Convert comma-separated string to array
      productCount: parseInt(currentCategory.productCount, 10),
    }

    if (currentCategory._id) {
      // Edit existing category
      await dispatch(
        updateCategory({ categoryId: currentCategory._id, categoryData })
      )
    } else {
      // Add new category
      await dispatch(createCategory(categoryData))
    }

    closeModal()
  }

  // Handle deleting a category
  const handleDeleteCategory = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      await dispatch(deleteCategory(id))
    }
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div className='p-6 bg-green50 min-h-screen'>
      <h1 className='text-2xl font-bold mb-6 text-gray-800'>
        Manage Categories
      </h1>
      <div className='bg-green-50 p-6 rounded-lg shadow-md'>
        <div className='flex justify-end mb-4'>
          <button
            onClick={openAddModal}
            className='bg-defaul-button-colors text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-red-500 transition-colors'
          >
            <FaPlus />
            <span>Add Category</span>
          </button>
        </div>
        {/* Scrollable Table Container */}
        <div className='overflow-y-auto max-h-[calc(100vh-200px)]'>
          <table className='w-full'>
            <thead>
              <tr className='bg-gray-100 text-gray-700'>
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
              {Array.isArray(categories) &&
                categories.map((category) => (
                  <React.Fragment key={category._id}>
                    <tr className='border-b hover:bg-gray-50 transition-colors'>
                      <td className='p-3 text-gray-700'>
                        <a
                          href={`/shop/category/${category._id}`} // Link to the category page
                          className='font-bold underline hover:text-blue-600'
                        >
                          {category.name}
                        </a>
                      </td>
                      <td className='p-3 text-gray-700'>
                        {category.description}
                      </td>
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
                      <td className='p-3 text-gray-700'>
                        {category.productCount}
                      </td>
                      <td className='p-2 flex space-x-2'>
                        <button
                          onClick={() => openEditModal(category)}
                          className='text-yellow-500 hover:text-yellow-700 bg-yellow-100 px-2 py-1 rounded-md flex items-center space-x-1'
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
                        <td colSpan='7' className='p-3 bg-gray-50'>
                          <div className='pl-6'>
                            <ul className='list-disc list-inside'>
                              {category.subcategories.map(
                                (subcategory, index) => (
                                  <li key={index} className='text-gray-700'>
                                    {subcategory}
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
                  className='bg-defaul-button-colors text-white px-4 py-2 rounded-md hover:bg-red-500 transition-colors'
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
