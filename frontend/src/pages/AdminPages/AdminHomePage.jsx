// frontend/src/pages/AdminHomePage.jsx
import { FaUsers, FaBox, FaShoppingCart, FaChartLine } from 'react-icons/fa'

const AdminHomePage = () => {
  return (
    <div className='p-6'>
      <h1 className='text-2xl font-semibold mb-6'>Admin Dashboard</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
        {/* Quick Stats Cards */}
        <div className='bg-white p-6 rounded-lg shadow-md'>
          <div className='flex items-center space-x-4'>
            <FaUsers className='text-3xl text-blue-500' />
            <div>
              <p className='text-gray-600'>Total Users</p>
              <p className='text-2xl font-bold'>1,234</p>
            </div>
          </div>
        </div>
        <div className='bg-white p-6 rounded-lg shadow-md'>
          <div className='flex items-center space-x-4'>
            <FaBox className='text-3xl text-green-500' />
            <div>
              <p className='text-gray-600'>Total Products</p>
              <p className='text-2xl font-bold'>567</p>
            </div>
          </div>
        </div>
        <div className='bg-white p-6 rounded-lg shadow-md'>
          <div className='flex items-center space-x-4'>
            <FaShoppingCart className='text-3xl text-purple-500' />
            <div>
              <p className='text-gray-600'>Total Orders</p>
              <p className='text-2xl font-bold'>890</p>
            </div>
          </div>
        </div>
        <div className='bg-white p-6 rounded-lg shadow-md'>
          <div className='flex items-center space-x-4'>
            <FaChartLine className='text-3xl text-orange-500' />
            <div>
              <p className='text-gray-600'>Revenue</p>
              <p className='text-2xl font-bold'>$12,345</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className='bg-white p-6 rounded-lg shadow-md'>
        <h2 className='text-xl font-semibold mb-4'>Recent Orders</h2>
        <table className='w-full'>
          <thead>
            <tr className='border-b'>
              <th className='text-left p-2'>Order ID</th>
              <th className='text-left p-2'>Customer</th>
              <th className='text-left p-2'>Date</th>
              <th className='text-left p-2'>Total</th>
              <th className='text-left p-2'>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className='border-b'>
              <td className='p-2'>#12345</td>
              <td className='p-2'>John Doe</td>
              <td className='p-2'>2023-10-01</td>
              <td className='p-2'>$199.99</td>
              <td className='p-2 text-green-500'>Delivered</td>
            </tr>
            <tr className='border-b'>
              <td className='p-2'>#12346</td>
              <td className='p-2'>Jane Smith</td>
              <td className='p-2'>2023-10-02</td>
              <td className='p-2'>$299.99</td>
              <td className='p-2 text-yellow-500'>Pending</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminHomePage
