import { FaTags, FaPlus, FaEdit, FaTrash, FaCalendarAlt, FaSearch } from 'react-icons/fa'
import { useState } from 'react'

const promotions = [
  {
    id: 1,
    name: 'Summer Sale',
    code: 'SUMMER25',
    discount: '25%',
    startDate: '2023-06-01',
    endDate: '2023-06-30',
    status: 'active',
  },
  {
    id: 2,
    name: 'New Customer',
    code: 'WELCOME10',
    discount: '10%',
    startDate: '2023-05-01',
    endDate: '2023-12-31',
    status: 'active',
  },
  {
    id: 3,
    name: 'Clearance',
    code: 'CLEAR50',
    discount: '50%',
    startDate: '2023-05-15',
    endDate: '2023-05-31',
    status: 'expired',
  },
]

const SuperAdminPromotions = () => {
  const [isCreating, setIsCreating] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredPromotions = promotions.filter(
    (promo) =>
      promo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      promo.code.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className='bg-white rounded-lg shadow-md p-6'>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-6'>
        <h2 className='text-2xl font-bold text-gray-800 flex items-center'>
          <FaTags className='mr-2 text-superadmin-600' />
          Promotions Management
        </h2>
        <div className='flex space-x-3 mt-3 md:mt-0'>
          <div className='relative'>
            <FaSearch className='absolute left-3 top-3 text-gray-400' />
            <input
              type='text'
              placeholder='Search promotions...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-superadmin-500 focus:border-superadmin-500'
            />
          </div>
          <button
            onClick={() => setIsCreating(true)}
            className='bg-superadmin-600 hover:bg-superadmin-700 text-white px-4 py-2 rounded-md flex items-center'
          >
            <FaPlus className='mr-2' />
            New Promotion
          </button>
        </div>
      </div>

      {isCreating && (
        <div className='mb-6 bg-gray-50 p-6 rounded-lg border border-gray-200'>
          <h3 className='text-lg font-medium text-gray-900 mb-4'>
            Create New Promotion
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Promotion Name
              </label>
              <input
                type='text'
                className='w-full border border-gray-300 rounded-md px-3 py-2'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Discount Code
              </label>
              <input
                type='text'
                className='w-full border border-gray-300 rounded-md px-3 py-2'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Discount Type
              </label>
              <select className='w-full border border-gray-300 rounded-md px-3 py-2'>
                <option>Percentage</option>
                <option>Fixed Amount</option>
                <option>Free Shipping</option>
              </select>
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Discount Value
              </label>
              <input
                type='text'
                className='w-full border border-gray-300 rounded-md px-3 py-2'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Start Date
              </label>
              <div className='relative'>
                <FaCalendarAlt className='absolute left-3 top-3 text-gray-400' />
                <input
                  type='date'
                  className='w-full pl-10 border border-gray-300 rounded-md px-3 py-2'
                />
              </div>
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                End Date
              </label>
              <div className='relative'>
                <FaCalendarAlt className='absolute left-3 top-3 text-gray-400' />
                <input
                  type='date'
                  className='w-full pl-10 border border-gray-300 rounded-md px-3 py-2'
                />
              </div>
            </div>
          </div>
          <div className='flex justify-end space-x-3 mt-6'>
            <button
              onClick={() => setIsCreating(false)}
              className='border border-gray-300 hover:bg-gray-100 px-4 py-2 rounded-md'
            >
              Cancel
            </button>
            <button className='bg-superadmin-600 hover:bg-superadmin-700 text-white px-4 py-2 rounded-md'>
              Create Promotion
            </button>
          </div>
        </div>
      )}

      <div className='overflow-x-auto'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Name
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Code
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Discount
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Dates
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Status
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {filteredPromotions.map((promo) => (
              <tr key={promo.id}>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                  {promo.name}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono'>
                  {promo.code}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  {promo.discount}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  {promo.startDate} to {promo.endDate}
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      promo.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {promo.status.charAt(0).toUpperCase() +
                      promo.status.slice(1)}
                  </span>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                  <button className='text-superadmin-600 hover:text-superadmin-700 mr-3'>
                    <FaEdit />
                  </button>
                  <button className='text-red-600 hover:text-red-700'>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SuperAdminPromotions
