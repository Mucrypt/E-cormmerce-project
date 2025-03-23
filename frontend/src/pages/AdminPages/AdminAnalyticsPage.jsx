import {
  FaChartLine,
  FaDollarSign,
  FaShoppingCart,
  FaUsers,
} from 'react-icons/fa'
import { Line, Bar, Pie } from 'react-chartjs-2'
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
  ArcElement,
} from 'chart.js'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

const AdminAnalyticsPage = () => {
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

  const revenueData = {
    labels: ['Electronics', 'Clothing', 'Home & Kitchen', 'Toys', 'Books'],
    datasets: [
      {
        label: 'Revenue',
        data: [12000, 8000, 6000, 4000, 2000],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderWidth: 1,
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

  return (
    <div className='overflow-y-auto max-h-[calc(100vh-200px)] p-6'>
      <h1 className='text-2xl font-semibold mb-6'>Analytics Dashboard</h1>

      {/* Quick Stats Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 overflow-auto scroll-auto'>
        <div className='bg-white p-6 rounded-lg shadow-md flex items-center space-x-4'>
          <FaDollarSign className='text-3xl text-blue-500' />
          <div>
            <p className='text-gray-600'>Total Revenue</p>
            <p className='text-2xl font-bold'>$12,345</p>
          </div>
        </div>
        <div className='bg-white p-6 rounded-lg shadow-md flex items-center space-x-4'>
          <FaShoppingCart className='text-3xl text-green-500' />
          <div>
            <p className='text-gray-600'>Total Orders</p>
            <p className='text-2xl font-bold'>890</p>
          </div>
        </div>
        <div className='bg-white p-6 rounded-lg shadow-md flex items-center space-x-4'>
          <FaUsers className='text-3xl text-purple-500' />
          <div>
            <p className='text-gray-600'>Total Users</p>
            <p className='text-2xl font-bold'>1,234</p>
          </div>
        </div>
        <div className='bg-white p-6 rounded-lg shadow-md flex items-center space-x-4'>
          <FaChartLine className='text-3xl text-orange-500' />
          <div>
            <p className='text-gray-600'>Sales Growth</p>
            <p className='text-2xl font-bold'>+15%</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* Sales Line Chart */}
        <div className='bg-white p-6 rounded-lg shadow-md'>
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

        {/* Revenue Pie Chart */}
        <div className='bg-white p-6 rounded-lg shadow-md'>
          <h2 className='text-xl font-semibold mb-4'>Revenue by Category</h2>
          <Pie
            data={revenueData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: 'bottom' },
                title: { display: true, text: 'Revenue Distribution' },
              },
            }}
          />
        </div>

        {/* User Growth Bar Chart */}
        <div className='bg-white p-6 rounded-lg shadow-md col-span-1 lg:col-span-2'>
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
    </div>
  )
}

export default AdminAnalyticsPage
