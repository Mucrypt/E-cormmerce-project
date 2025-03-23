import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import uploadImage from '../../utils/uploadImage'
import axios from 'axios'

const AdminAddProduct = ({ product, onClose, onSave }) => {
  const [currentProduct, setCurrentProduct] = useState({
    ...product,
    images: product.images || [],
    attributes: product.attributes || {},
    sizes: product.sizes || [],
    colors: product.colors || [],
    collections: product.collections || [],
    dimensions: product.dimensions || {},
    tags: product.tags || [],
  })
  const [isUploading, setIsUploading] = useState(false)
  const [newAttribute, setNewAttribute] = useState({ name: '', values: '' })
  const [newSize, setNewSize] = useState('')
  const [newColor, setNewColor] = useState('')
  const [newCollection, setNewCollection] = useState('')
  const [newTag, setNewTag] = useState('')
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/categories`
        )
        setCategories(response.data)
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }
    fetchCategories()
  }, [])

  // Define category-specific fields
  const categoryFields = {
    Clothing: ['sizes', 'colors', 'material', 'careInstructions', 'gender'],
    Furniture: ['dimensions', 'weight', 'material'],
    Electronics: ['warranty', 'powerConsumption', 'dimensions'],
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCurrentProduct({ ...currentProduct, [name]: value })
  }

  const handleImageUpload = async (e) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setIsUploading(true)
    const uploadedImages = []
    for (const file of files) {
      const data = await uploadImage(file)
      if (data) {
        uploadedImages.push({ url: data.secure_url, altText: file.name })
      }
    }
    setCurrentProduct({
      ...currentProduct,
      images: [...currentProduct.images, ...uploadedImages],
    })
    setIsUploading(false)
  }

  const removeImage = (index) => {
    const updatedImages = currentProduct.images.filter((_, i) => i !== index)
    setCurrentProduct({ ...currentProduct, images: updatedImages })
  }

  const addAttribute = () => {
    if (newAttribute.name && newAttribute.values) {
      const valuesArray = newAttribute.values.split(',').map((v) => v.trim())
      setCurrentProduct({
        ...currentProduct,
        attributes: {
          ...currentProduct.attributes,
          [newAttribute.name]: valuesArray,
        },
      })
      setNewAttribute({ name: '', values: '' })
    }
  }

  const removeAttribute = (attributeName) => {
    const updatedAttributes = { ...currentProduct.attributes }
    delete updatedAttributes[attributeName]
    setCurrentProduct({
      ...currentProduct,
      attributes: updatedAttributes,
    })
  }

  const addSize = () => {
    if (newSize) {
      setCurrentProduct({
        ...currentProduct,
        sizes: [...currentProduct.sizes, newSize],
      })
      setNewSize('')
    }
  }

  const addColor = () => {
    if (newColor) {
      setCurrentProduct({
        ...currentProduct,
        colors: [...currentProduct.colors, newColor],
      })
      setNewColor('')
    }
  }

  const addCollection = () => {
    if (newCollection) {
      setCurrentProduct({
        ...currentProduct,
        collections: [...currentProduct.collections, newCollection],
      })
      setNewCollection('')
    }
  }

  const addTag = () => {
    if (newTag) {
      setCurrentProduct({
        ...currentProduct,
        tags: [...currentProduct.tags, newTag],
      })
      setNewTag('')
    }
  }

  const handleSaveProduct = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/products`,
        currentProduct,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        }
      )
      onSave(response.data)
      onClose()
    } catch (error) {
      console.error('Error saving product:', error)
      alert(
        error.response?.data?.error ||
          error.response?.data?.message ||
          'Failed to save product. Please try again.'
      )
    }
  }

  const renderCategorySpecificFields = () => {
    if (!selectedCategory) return null

    const fields = categoryFields[selectedCategory] || []

    return fields.map((field) => {
      switch (field) {
        case 'sizes':
          return (
            <div key={field}>
              <label className='block text-sm font-medium text-gray-700'>
                Sizes
              </label>
              <div className='flex space-x-2'>
                <input
                  type='text'
                  placeholder='Add size'
                  value={newSize}
                  onChange={(e) => setNewSize(e.target.value)}
                  className='p-2 border rounded-md'
                />
                <button
                  onClick={addSize}
                  className='bg-defaul-button-colors text-white px-4 py-2 rounded-md hover:bg-red-500 transition-colors'
                >
                  Add Size
                </button>
              </div>
              <div className='flex flex-wrap gap-2 mt-2'>
                {currentProduct.sizes.map((size, index) => (
                  <div key={index} className='bg-gray-200 px-2 py-1 rounded'>
                    {size}
                  </div>
                ))}
              </div>
            </div>
          )
        case 'colors':
          return (
            <div key={field}>
              <label className='block text-sm font-medium text-gray-700'>
                Colors
              </label>
              <div className='flex space-x-2'>
                <input
                  type='text'
                  placeholder='Add color'
                  value={newColor}
                  onChange={(e) => setNewColor(e.target.value)}
                  className='p-2 border rounded-md'
                />
                <button
                  onClick={addColor}
                  className='bg-defaul-button-colors text-white px-4 py-2 rounded-md hover:bg-red-500 transition-colors'
                >
                  Add Color
                </button>
              </div>
              <div className='flex flex-wrap gap-2 mt-2'>
                {currentProduct.colors.map((color, index) => (
                  <div key={index} className='bg-gray-200 px-2 py-1 rounded'>
                    {color}
                  </div>
                ))}
              </div>
            </div>
          )
        case 'material':
          return (
            <div key={field}>
              <label className='block text-sm font-medium text-gray-700'>
                Material
              </label>
              <input
                type='text'
                name='material'
                value={currentProduct.material}
                onChange={handleInputChange}
                className='w-full p-2 border rounded-md'
                placeholder='Enter material'
              />
            </div>
          )
        case 'careInstructions':
          return (
            <div key={field}>
              <label className='block text-sm font-medium text-gray-700'>
                Care Instructions
              </label>
              <textarea
                name='careInstructions'
                value={currentProduct.careInstructions}
                onChange={handleInputChange}
                className='w-full p-2 border rounded-md'
                placeholder='Enter care instructions'
              />
            </div>
          )
        case 'gender':
          return (
            <div key={field}>
              <label className='block text-sm font-medium text-gray-700'>
                Gender
              </label>
              <select
                name='gender'
                value={currentProduct.gender}
                onChange={handleInputChange}
                className='w-full p-2 border rounded-md'
              >
                <option value=''>Select Gender</option>
                <option value='Men'>Men</option>
                <option value='Women'>Women</option>
                <option value='Kids'>Kids</option>
                <option value='Unisex'>Unisex</option>
                <option value='Male'>Male</option>
                <option value='Female'>Female</option>
              </select>
            </div>
          )
        case 'dimensions':
          return (
            <div key={field}>
              <label className='block text-sm font-medium text-gray-700'>
                Dimensions
              </label>
              <div className='space-y-2'>
                <input
                  type='text'
                  name='dimensions.height'
                  value={currentProduct.dimensions.height || ''}
                  onChange={(e) =>
                    setCurrentProduct({
                      ...currentProduct,
                      dimensions: {
                        ...currentProduct.dimensions,
                        height: e.target.value,
                      },
                    })
                  }
                  className='w-full p-2 border rounded-md'
                  placeholder='Height'
                />
                <input
                  type='text'
                  name='dimensions.width'
                  value={currentProduct.dimensions.width || ''}
                  onChange={(e) =>
                    setCurrentProduct({
                      ...currentProduct,
                      dimensions: {
                        ...currentProduct.dimensions,
                        width: e.target.value,
                      },
                    })
                  }
                  className='w-full p-2 border rounded-md'
                  placeholder='Width'
                />
                <input
                  type='text'
                  name='dimensions.depth'
                  value={currentProduct.dimensions.depth || ''}
                  onChange={(e) =>
                    setCurrentProduct({
                      ...currentProduct,
                      dimensions: {
                        ...currentProduct.dimensions,
                        depth: e.target.value,
                      },
                    })
                  }
                  className='w-full p-2 border rounded-md'
                  placeholder='Depth'
                />
              </div>
            </div>
          )
        case 'weight':
          return (
            <div key={field}>
              <label className='block text-sm font-medium text-gray-700'>
                Weight (grams)
              </label>
              <input
                type='number'
                name='weight'
                value={currentProduct.weight}
                onChange={handleInputChange}
                className='w-full p-2 border rounded-md'
                placeholder='Enter weight'
              />
            </div>
          )
        case 'warranty':
          return (
            <div key={field}>
              <label className='block text-sm font-medium text-gray-700'>
                Warranty
              </label>
              <input
                type='text'
                name='warranty'
                value={currentProduct.warranty}
                onChange={handleInputChange}
                className='w-full p-2 border rounded-md'
                placeholder='Enter warranty'
              />
            </div>
          )
        case 'powerConsumption':
          return (
            <div key={field}>
              <label className='block text-sm font-medium text-gray-700'>
                Power Consumption
              </label>
              <input
                type='text'
                name='powerConsumption'
                value={currentProduct.powerConsumption}
                onChange={handleInputChange}
                className='w-full p-2 border rounded-md'
                placeholder='Enter power consumption'
              />
            </div>
          )
        default:
          return null
      }
    })
  }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white p-6 rounded-lg shadow-md w-full max-w-2xl max-h-[90vh] overflow-y-auto'>
        <h2 className='text-xl font-semibold mb-4'>Add Product</h2>
        <div className='space-y-4'>
          {/* Product Name */}
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

          {/* Description */}
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

          {/* Price */}
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

          {/* Discount Price */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Discount Price
            </label>
            <input
              type='number'
              name='discountPrice'
              value={currentProduct.discountPrice}
              onChange={handleInputChange}
              className='w-full p-2 border rounded-md'
              placeholder='Enter discount price'
            />
          </div>

          {/* Brand */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Brand
            </label>
            <input
              type='text'
              name='brand'
              value={currentProduct.brand}
              onChange={handleInputChange}
              className='w-full p-2 border rounded-md'
              placeholder='Enter brand'
            />
          </div>

          {/* Stock */}
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

          {/* Category */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Category
            </label>
            <select
              name='category'
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className='w-full p-2 border rounded-md'
            >
              <option value=''>Select Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Images */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Images
            </label>
            <input
              type='file'
              accept='image/*'
              onChange={handleImageUpload}
              className='w-full p-2 border rounded-md'
              multiple
            />
            {isUploading && (
              <p className='text-sm text-gray-500'>Uploading images...</p>
            )}
            <div className='flex flex-wrap gap-2 mt-2'>
              {currentProduct.images.map((image, index) => (
                <div key={index} className='relative'>
                  <img
                    src={image.url || image}
                    alt={`Preview ${index}`}
                    className='w-12 h-12 object-cover rounded'
                  />
                  <button
                    onClick={() => removeImage(index)}
                    className='absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center'
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Status */}
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

          {/* Render category-specific fields */}
          {renderCategorySpecificFields()}

          {/* Collections */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Collections
            </label>
            <div className='flex space-x-2'>
              <input
                type='text'
                placeholder='Add collection'
                value={newCollection}
                onChange={(e) => setNewCollection(e.target.value)}
                className='p-2 border rounded-md'
              />
              <button
                onClick={addCollection}
                className='bg-defaul-button-colors text-white px-4 py-2 rounded-md hover:bg-red-500 transition-colors'
              >
                Add Collection
              </button>
            </div>
            <div className='flex flex-wrap gap-2 mt-2'>
              {currentProduct.collections.map((collection, index) => (
                <div key={index} className='bg-gray-200 px-2 py-1 rounded'>
                  {collection}
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Tags
            </label>
            <div className='flex space-x-2'>
              <input
                type='text'
                placeholder='Add tag'
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                className='p-2 border rounded-md'
              />
              <button
                onClick={addTag}
                className='bg-defaul-button-colors text-white px-4 py-2 rounded-md hover:bg-red-500 transition-colors'
              >
                Add Tag
              </button>
            </div>
            <div className='flex flex-wrap gap-2 mt-2'>
              {currentProduct.tags.map((tag, index) => (
                <div key={index} className='bg-gray-200 px-2 py-1 rounded'>
                  {tag}
                </div>
              ))}
            </div>
          </div>

          {/* Attributes */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Attributes
            </label>
            <div className='space-y-2'>
              {Object.entries(currentProduct.attributes).map(
                ([attrName, values]) => (
                  <div key={attrName} className='flex items-center space-x-2'>
                    <span className='font-medium'>{attrName}:</span>
                    <span>
                      {Array.isArray(values) ? values.join(', ') : values}
                    </span>
                    <button
                      onClick={() => removeAttribute(attrName)}
                      className='text-red-500 hover:text-red-700'
                    >
                      &times;
                    </button>
                  </div>
                )
              )}
            </div>
            <div className='mt-2 flex space-x-2'>
              <input
                type='text'
                placeholder='Attribute Name'
                value={newAttribute.name}
                onChange={(e) =>
                  setNewAttribute({ ...newAttribute, name: e.target.value })
                }
                className='p-2 border rounded-md'
              />
              <input
                type='text'
                placeholder='Values (comma separated)'
                value={newAttribute.values}
                onChange={(e) =>
                  setNewAttribute({ ...newAttribute, values: e.target.value })
                }
                className='p-2 border rounded-md'
              />
              <button
                onClick={addAttribute}
                className='bg-defaul-button-colors text-white px-4 py-2 rounded-md hover:bg-red-500 transition-colors'
              >
                Add Attribute
              </button>
            </div>
          </div>

          {/* Meta Title */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Meta Title
            </label>
            <input
              type='text'
              name='metaTitle'
              value={currentProduct.metaTitle}
              onChange={handleInputChange}
              className='w-full p-2 border rounded-md'
              placeholder='Enter meta title'
            />
          </div>

          {/* Meta Description */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Meta Description
            </label>
            <textarea
              name='metaDescription'
              value={currentProduct.metaDescription}
              onChange={handleInputChange}
              className='w-full p-2 border rounded-md'
              placeholder='Enter meta description'
            />
          </div>

          {/* Meta Keywords */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Meta Keywords
            </label>
            <input
              type='text'
              name='metaKeywords'
              value={currentProduct.metaKeywords}
              onChange={handleInputChange}
              className='w-full p-2 border rounded-md'
              placeholder='Enter meta keywords'
            />
          </div>
        </div>
        <div className='flex justify-end space-x-4 mt-4'>
          <button
            onClick={onClose}
            className='bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors'
          >
            Cancel
          </button>
          <button
            onClick={handleSaveProduct}
            className='bg-defaul-button-colors text-white px-4 py-2 rounded-md hover:bg-red-500 transition-colors'
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  )
}

AdminAddProduct.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    discountPrice: PropTypes.number,
    brand: PropTypes.string,
    stock: PropTypes.number,
    category: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    images: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    ),
    status: PropTypes.string,
    attributes: PropTypes.object,
    sizes: PropTypes.arrayOf(PropTypes.string),
    colors: PropTypes.arrayOf(PropTypes.string),
    collections: PropTypes.arrayOf(PropTypes.string),
    material: PropTypes.string,
    careInstructions: PropTypes.string,
    gender: PropTypes.string,
    dimensions: PropTypes.object,
    weight: PropTypes.number,
    metaTitle: PropTypes.string,
    metaDescription: PropTypes.string,
    metaKeywords: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
}

export default AdminAddProduct
