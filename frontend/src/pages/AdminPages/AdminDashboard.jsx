// frontend/src/pages/AdminDashboard.jsx
import {
  FaUsers,
  FaBox,
  FaShoppingCart,
  FaChartLine,
 
} from 'react-icons/fa'
import { Line, Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { useState } from 'react'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const AdminDashboard = () => {
  // Mock data for charts
  const salesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Sales',
        data: [5000, 7000, 12000, 9000, 15000, 18000, 20000],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  }

  const userGrowthData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'New Users',
        data: [100, 150, 200, 300, 400, 500, 600],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
      },
    ],
  }

  // State for filters
  const [filters, setFilters] = useState({
    status: '',
    dateRange: '',
  })

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters({ ...filters, [name]: value })
  }

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-semibold mb-6'>Admin Dashboard</h1>

      {/* Quick Stats Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
        <div className='bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow'>
          <div className='flex items-center space-x-4'>
            <FaUsers className='text-3xl text-blue-500' />
            <div>
              <p className='text-gray-600'>Total Users</p>
              <p className='text-2xl font-bold'>1,234</p>
            </div>
          </div>
        </div>
        <div className='bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow'>
          <div className='flex items-center space-x-4'>
            <FaBox className='text-3xl text-green-500' />
            <div>
              <p className='text-gray-600'>Total Products</p>
              <p className='text-2xl font-bold'>567</p>
            </div>
          </div>
        </div>
        <div className='bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow'>
          <div className='flex items-center space-x-4'>
            <FaShoppingCart className='text-3xl text-purple-500' />
            <div>
              <p className='text-gray-600'>Total Orders</p>
              <p className='text-2xl font-bold'>890</p>
            </div>
          </div>
        </div>
        <div className='bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow'>
          <div className='flex items-center space-x-4'>
            <FaChartLine className='text-3xl text-orange-500' />
            <div>
              <p className='text-gray-600'>Revenue</p>
              <p className='text-2xl font-bold'>$12,345</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8'>
        {/* Sales Line Chart */}
        <div className='bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow'>
          <h2 className='text-xl font-semibold mb-4'>Sales Overview</h2>
          <Line
            data={salesData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: 'top' },
                title: { display: true, text: 'Monthly Sales Performance' },
              },
            }}
          />
        </div>

        {/* User Growth Bar Chart */}
        <div className='bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow'>
          <h2 className='text-xl font-semibold mb-4'>User Growth</h2>
          <Bar
            data={userGrowthData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: 'top' },
                title: { display: true, text: 'Monthly User Growth' },
              },
            }}
          />
        </div>
      </div>

      {/* Recent Orders Table with Filters */}
      <div className='bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-xl font-semibold'>Recent Orders</h2>
          <div className='flex space-x-4'>
            <select
              name='status'
              value={filters.status}
              onChange={handleFilterChange}
              className='p-2 border rounded-md'
            >
              <option value=''>All Statuses</option>
              <option value='Delivered'>Delivered</option>
              <option value='Pending'>Pending</option>
            </select>
            <input
              type='date'
              name='dateRange'
              value={filters.dateRange}
              onChange={handleFilterChange}
              className='p-2 border rounded-md'
            />
          </div>
        </div>
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

export default AdminDashboard
