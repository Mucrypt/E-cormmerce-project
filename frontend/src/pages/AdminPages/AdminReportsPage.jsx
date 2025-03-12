// frontend/src/pages/AdminReportsPage.jsx
import { FaFileAlt } from 'react-icons/fa'

const AdminReportsPage = () => {
  return (
    <div className='p-6'>
      <h1 className='text-2xl font-semibold mb-6'>Reports</h1>
      <div className='bg-white p-6 rounded-lg shadow-md'>
        <div className='flex items-center space-x-4'>
          <FaFileAlt className='text-3xl text-blue-500' />
          <div>
            <p className='text-gray-600'>Sales Report</p>
            <p className='text-2xl font-bold'>$12,345</p>
          </div>
        </div>
        {/* Add report charts or tables here */}
      </div>
    </div>
  )
}

export default AdminReportsPage
