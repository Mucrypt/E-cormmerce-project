import { useState } from 'react'
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa'

const AdminInventoryPage = () => {
  // Sample inventory data
  const [inventory, setInventory] = useState([
    { id: 1, product: 'Product A', stock: 100 },
    { id: 2, product: 'Product B', stock: 5 },
    { id: 3, product: 'Product C', stock: 0 },
    { id: 4, product: 'Product D', stock: 200 },
  ])

  // State for the edit stock modal
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentItem, setCurrentItem] = useState({
    id: '',
    product: '',
    stock: '',
  })

  // State for search and filters
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStock, setFilterStock] = useState('')

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Open the edit stock modal
  const openEditModal = (item) => {
    setCurrentItem(item)
    setIsModalOpen(true)
  }

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false)
  }

  // Handle saving edited stock
  const handleSaveStock = () => {
    if (!currentItem.stock || isNaN(currentItem.stock)) return

    setInventory(
      inventory.map((item) =>
        item.id === currentItem.id
          ? { ...item, stock: parseInt(currentItem.stock, 10) }
          : item
      )
    )
    closeModal()
  }

  // Handle deleting an inventory item
  const handleDeleteItem = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setInventory(inventory.filter((item) => item.id !== id))
    }
  }

  // Handle restocking an item
  const handleRestock = (id) => {
    setInventory(
      inventory.map((item) =>
        item.id === id ? { ...item, stock: item.stock + 50 } : item
      )
    )
  }

  // Filtered inventory based on search and stock level
  const filteredInventory = inventory.filter((item) => {
    const matchesSearch = item.product
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    const matchesStock = filterStock
      ? (filterStock === 'low' && item.stock <= 10) ||
        (filterStock === 'out' && item.stock === 0) ||
        (filterStock === 'sufficient' && item.stock > 10)
      : true
    return matchesSearch && matchesStock
  })

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredInventory.slice(
    indexOfFirstItem,
    indexOfLastItem
  )

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-semibold mb-6'>Manage Inventory</h1>
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
              <FaEdit className='absolute left-3 top-3 text-gray-500' />
            </div>
            <select
              value={filterStock}
              onChange={(e) => setFilterStock(e.target.value)}
              className='p-2 border rounded-md'
            >
              <option value=''>All Stock Levels</option>
              <option value='low'>Low Stock (≤ 10)</option>
              <option value='out'>Out of Stock</option>
              <option value='sufficient'>Sufficient Stock ({">"} 10)</option>
            </select>
          </div>
          <button
            onClick={() => openEditModal({ id: '', product: '', stock: '' })}
            className='bg-defaul-button-colors text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-red-500 transition-colors'
          >
            <FaPlus />
            <span>Add Product</span>
          </button>
        </div>

        {/* Inventory Table */}
        <table className='w-full'>
          <thead>
            <tr className='border-b'>
              <th className='text-left p-2'>Product</th>
              <th className='text-left p-2'>Stock</th>
              <th className='text-left p-2'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr
                key={item.id}
                className='border-b hover:bg-gray-50 transition-colors'
              >
                <td className='p-2'>{item.product}</td>
                <td className='p-2'>
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      item.stock === 0
                        ? 'bg-red-100 text-red-700'
                        : item.stock <= 10
                        ? 'bg-orange-100 text-orange-700'
                        : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {item.stock === 0
                      ? 'Out of Stock'
                      : `${item.stock} in Stock`}
                  </span>
                </td>
                <td className='p-2 flex space-x-2'>
                  <button
                    onClick={() => openEditModal(item)}
                    className='text-yellow-500 hover:text-yellow-700 bg-blue-100 px-2 py-1 rounded-md flex items-center space-x-1'
                  >
                    <FaEdit />
                    <span>Edit</span>
                  </button>
                  {item.stock <= 10 && item.stock > 0 && (
                    <button
                      onClick={() => handleRestock(item.id)}
                      className='text-green-500 hover:text-green-700 bg-green-100 px-2 py-1 rounded-md flex items-center space-x-1'
                    >
                      <FaPlus />
                      <span>Restock</span>
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteItem(item.id)}
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

        {/* Pagination */}
        <div className='flex justify-center mt-4'>
          {Array.from({
            length: Math.ceil(filteredInventory.length / itemsPerPage),
          }).map((_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`px-4 py-2 mx-1 rounded-md ${
                currentPage === index + 1
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Edit Stock Modal */}
      {isModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white p-6 rounded-lg shadow-xl w-full max-w-md'>
            <h2 className='text-xl font-semibold mb-4'>
              {currentItem.id ? 'Edit Stock' : 'Add Product'}
            </h2>
            <div className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Product Name
                </label>
                <input
                  type='text'
                  value={currentItem.product}
                  onChange={(e) =>
                    setCurrentItem({ ...currentItem, product: e.target.value })
                  }
                  className='w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='Enter product name'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Stock Level
                </label>
                <input
                  type='number'
                  value={currentItem.stock}
                  onChange={(e) =>
                    setCurrentItem({ ...currentItem, stock: e.target.value })
                  }
                  className='w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='Enter stock level'
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
                  onClick={handleSaveStock}
                  className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors'
                >
                  {currentItem.id ? 'Save Changes' : 'Add Product'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminInventoryPage
