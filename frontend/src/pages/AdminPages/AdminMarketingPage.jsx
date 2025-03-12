import { useState } from 'react'
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa'

const AdminMarketingPage = () => {
  // Mock data for campaigns
  const [campaigns, setCampaigns] = useState([
    { id: 1, name: 'Summer Sale', discount: '20% Off', status: 'Active' },
    { id: 2, name: 'Black Friday', discount: '50% Off', status: 'Inactive' },
    { id: 3, name: 'Holiday Special', discount: '30% Off', status: 'Active' },
  ])

  // State for the add/edit campaign modal
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentCampaign, setCurrentCampaign] = useState({
    id: '',
    name: '',
    discount: '',
    status: 'Active',
  })

  // Open the add campaign modal
  const openAddModal = () => {
    setCurrentCampaign({
      id: '',
      name: '',
      discount: '',
      status: 'Active',
    })
    setIsModalOpen(true)
  }

  // Open the edit modal
  const openEditModal = (campaign) => {
    setCurrentCampaign(campaign)
    setIsModalOpen(true)
  }

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false)
  }

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCurrentCampaign({ ...currentCampaign, [name]: value })
  }

  // Handle adding/editing a campaign
  const handleSaveCampaign = () => {
    if (!currentCampaign.name || !currentCampaign.discount) return

    const newCampaign = {
      ...currentCampaign,
      id: currentCampaign.id || campaigns.length + 1,
    }

    if (currentCampaign.id) {
      // Edit existing campaign
      setCampaigns(
        campaigns.map((camp) =>
          camp.id === currentCampaign.id ? newCampaign : camp
        )
      )
    } else {
      // Add new campaign
      setCampaigns([...campaigns, newCampaign])
    }

    closeModal()
  }

  // Handle deleting a campaign
  const handleDeleteCampaign = (id) => {
    if (window.confirm('Are you sure you want to delete this campaign?')) {
      setCampaigns(campaigns.filter((camp) => camp.id !== id))
    }
  }

  return (
    <div className='p-6 bg-gray-50 min-h-screen'>
      <h1 className='text-2xl font-semibold mb-6 text-gray-800'>
        Manage Marketing Campaigns
      </h1>
      <div className='bg-white p-6 rounded-lg shadow-md'>
        <div className='flex justify-end mb-4'>
          <button
            onClick={openAddModal}
            className='bg-defaul-button-colors text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-red-500 transition-colors'
          >
            <FaPlus />
            <span>Add Campaign</span>
          </button>
        </div>
        <table className='w-full'>
          <thead>
            <tr className='bg-gray-100 text-gray-700'>
              <th className='text-left p-3'>Campaign</th>
              <th className='text-left p-3'>Discount</th>
              <th className='text-left p-3'>Status</th>
              <th className='text-left p-3'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((campaign) => (
              <tr
                key={campaign.id}
                className='border-b hover:bg-gray-50 transition-colors'
              >
                <td className='p-3 text-gray-700'>{campaign.name}</td>
                <td className='p-3 text-gray-700'>{campaign.discount}</td>
                <td className='p-3 text-gray-700'>
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      campaign.status === 'Active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {campaign.status}
                  </span>
                </td>
                <td className='p-3 flex space-x-2'>
                  <button
                    onClick={() => openEditModal(campaign)}
                    className='text-yellow-500 hover:text-yellow-700 bg-blue-100 px-2 py-1 rounded-md flex items-center space-x-1'
                  >
                    <FaEdit />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDeleteCampaign(campaign.id)}
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

      {/* Add/Edit Campaign Modal */}
      {isModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white p-6 rounded-lg shadow-xl w-full max-w-md'>
            <h2 className='text-xl font-semibold mb-4 text-gray-800'>
              {currentCampaign.id ? 'Edit Campaign' : 'Add Campaign'}
            </h2>
            <div className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Campaign Name
                </label>
                <input
                  type='text'
                  name='name'
                  value={currentCampaign.name}
                  onChange={handleInputChange}
                  className='w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='Enter campaign name'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Discount
                </label>
                <input
                  type='text'
                  name='discount'
                  value={currentCampaign.discount}
                  onChange={handleInputChange}
                  className='w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='Enter discount'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Status
                </label>
                <select
                  name='status'
                  value={currentCampaign.status}
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
                  onClick={handleSaveCampaign}
                  className='bg-defaul-button-colors text-white px-4 py-2 rounded-md hover:bg-red-500 transition-colors'
                >
                  {currentCampaign.id ? 'Save Changes' : 'Add Campaign'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminMarketingPage
