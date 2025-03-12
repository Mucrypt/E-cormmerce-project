import { useState } from 'react'
import PropTypes from 'prop-types'
import uploadImage from '../../utils/uploadImage'

const AdminAddProduct = ({ product, onClose, onSave }) => {
  const [currentProduct, setCurrentProduct] = useState({
    ...product,
    images: product.images || [],
    attributes: product.attributes || {}, // Initialize attributes as an empty object
  })
  const [isUploading, setIsUploading] = useState(false)
  const [newAttribute, setNewAttribute] = useState({ name: '', values: '' })

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
        uploadedImages.push(data.secure_url)
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

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white p-6 rounded-lg shadow-md w-full max-w-2xl max-h-[90vh] overflow-y-auto'>
        <h2 className='text-xl font-semibold mb-4'>Add Product</h2>
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
            <input
              type='text'
              name='category'
              value={currentProduct.category}
              onChange={handleInputChange}
              className='w-full p-2 border rounded-md'
              placeholder='Enter category'
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Custom Attributes
            </label>
            <div className='space-y-2'>
              {Object.entries(currentProduct.attributes).map(
                ([attrName, values]) => (
                  <div key={attrName} className='flex items-center space-x-2'>
                    <span className='font-medium'>{attrName}:</span>
                    <span>{values.join(', ')}</span>
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
                className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors'
              >
                Add Attribute
              </button>
            </div>
          </div>
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
                    src={image}
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
        </div>
        <div className='flex justify-end space-x-4'>
          <button
            onClick={onClose}
            className='bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors'
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(currentProduct)}
            className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors'
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
    stock: PropTypes.number,
    category: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string),
    status: PropTypes.string,
    attributes: PropTypes.object,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
}

export default AdminAddProduct
