import {
  FaTachometerAlt,
  FaServer,
  FaDatabase,
  FaChartBar,
} from 'react-icons/fa'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const performanceData = [
  { name: 'Jan', responseTime: 400, uptime: 99.5, requests: 2400 },
  { name: 'Feb', responseTime: 300, uptime: 99.8, requests: 1398 },
  { name: 'Mar', responseTime: 200, uptime: 99.9, requests: 9800 },
  { name: 'Apr', responseTime: 278, uptime: 99.7, requests: 3908 },
  { name: 'May', responseTime: 189, uptime: 99.9, requests: 4800 },
  { name: 'Jun', responseTime: 239, uptime: 99.6, requests: 3800 },
  { name: 'Jul', responseTime: 349, uptime: 99.8, requests: 4300 },
]

const SuperAdminPerformance = () => {
  return (
    <div className='bg-white rounded-lg shadow-md p-6 overflow-y-auto max-h-[calc(100vh-200px)]'>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-6'>
        <h2 className='text-2xl font-bold text-gray-800 flex items-center'>
          <FaTachometerAlt className='mr-2 text-superadmin-600' />
          System Performance
        </h2>
        <div className='flex space-x-3 mt-3 md:mt-0'>
          <button className='border border-gray-300 hover:bg-gray-100 px-4 py-2 rounded-md'>
            Refresh Metrics
          </button>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
        <div className='bg-gray-50 p-4 rounded-lg'>
          <div className='flex items-center'>
            <div className='p-3 rounded-full bg-blue-100 text-blue-600 mr-4'>
              <FaServer className='text-xl' />
            </div>
            <div>
              <h3 className='text-sm font-medium text-gray-500'>
                Avg. Response Time
              </h3>
              <p className='text-2xl font-semibold text-gray-900'>243ms</p>
            </div>
          </div>
        </div>
        <div className='bg-gray-50 p-4 rounded-lg'>
          <div className='flex items-center'>
            <div className='p-3 rounded-full bg-green-100 text-green-600 mr-4'>
              <FaDatabase className='text-xl' />
            </div>
            <div>
              <h3 className='text-sm font-medium text-gray-500'>
                System Uptime
              </h3>
              <p className='text-2xl font-semibold text-gray-900'>99.87%</p>
            </div>
          </div>
        </div>
        <div className='bg-gray-50 p-4 rounded-lg'>
          <div className='flex items-center'>
            <div className='p-3 rounded-full bg-purple-100 text-purple-600 mr-4'>
              <FaChartBar className='text-xl' />
            </div>
            <div>
              <h3 className='text-sm font-medium text-gray-500'>
                Daily Requests
              </h3>
              <p className='text-2xl font-semibold text-gray-900'>4.2M</p>
            </div>
          </div>
        </div>
      </div>

      <div className='h-80 mb-8'>
        <ResponsiveContainer width='100%' height='100%'>
          <LineChart data={performanceData}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='name' />
            <YAxis yAxisId='left' orientation='left' stroke='#4299e1' />
            <YAxis yAxisId='right' orientation='right' stroke='#48bb78' />
            <Tooltip />
            <Legend />
            <Line
              yAxisId='left'
              type='monotone'
              dataKey='responseTime'
              stroke='#4299e1'
              name='Response Time (ms)'
            />
            <Line
              yAxisId='right'
              type='monotone'
              dataKey='uptime'
              stroke='#48bb78'
              name='Uptime (%)'
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        <div>
          <h3 className='text-lg font-medium text-gray-900 mb-4'>
            Recent Incidents
          </h3>
          <div className='bg-gray-50 p-4 rounded-lg'>
            <div className='space-y-4'>
              <div className='border-l-4 border-red-500 pl-4 py-2'>
                <div className='flex justify-between'>
                  <span className='font-medium'>Database Slowdown</span>
                  <span className='text-sm text-gray-500'>Jun 12, 2023</span>
                </div>
                <p className='text-sm text-gray-600 mt-1'>
                  Increased query times affecting checkout process
                </p>
              </div>
              <div className='border-l-4 border-yellow-500 pl-4 py-2'>
                <div className='flex justify-between'>
                  <span className='font-medium'>API Rate Limit</span>
                  <span className='text-sm text-gray-500'>May 28, 2023</span>
                </div>
                <p className='text-sm text-gray-600 mt-1'>
                  Third-party API rate limit reached
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h3 className='text-lg font-medium text-gray-900 mb-4'>
            Performance Tips
          </h3>
          <div className='bg-gray-50 p-4 rounded-lg'>
            <ul className='space-y-3 list-disc pl-5'>
              <li className='text-sm text-gray-700'>
                Optimize database indexes for frequently queried tables
              </li>
              <li className='text-sm text-gray-700'>
                Consider implementing a caching layer for product listings
              </li>
              <li className='text-sm text-gray-700'>
                Review third-party script loading for checkout page
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SuperAdminPerformance
