import { FaUsers, FaChartPie, FaCalendarAlt } from 'react-icons/fa'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

const userData = [
  { name: 'New Users', value: 400 },
  { name: 'Returning Users', value: 300 },
  { name: 'Inactive Users', value: 200 },
]

const COLORS = ['#4299e1', '#48bb78', '#f56565']

const SuperAdminUserAnalytics = () => {
  return (
    <div className='bg-white rounded-lg shadow-md p-6 overflow-y-auto max-h-[calc(100vh-200px)]'>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-6'>
        <h2 className='text-2xl font-bold text-gray-800 flex items-center'>
          <FaUsers className='mr-2 text-superadmin-600' />
          User Analytics
        </h2>
        <div className='flex space-x-3 mt-3 md:mt-0'>
          <button className='border border-gray-300 hover:bg-gray-100 px-4 py-2 rounded-md flex items-center'>
            <FaCalendarAlt className='mr-2' />
            Last 30 Days
          </button>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
        <div className='bg-gray-50 p-4 rounded-lg'>
          <h3 className='text-sm font-medium text-gray-500'>Total Users</h3>
          <p className='text-2xl font-semibold text-gray-900'>12,548</p>
          <p className='text-sm text-green-600'>↑ 15.2% from last month</p>
        </div>
        <div className='bg-gray-50 p-4 rounded-lg'>
          <h3 className='text-sm font-medium text-gray-500'>Active Users</h3>
          <p className='text-2xl font-semibold text-gray-900'>8,742</p>
          <p className='text-sm text-green-600'>↑ 9.8% from last month</p>
        </div>
        <div className='bg-gray-50 p-4 rounded-lg'>
          <h3 className='text-sm font-medium text-gray-500'>Avg. Session</h3>
          <p className='text-2xl font-semibold text-gray-900'>4m 23s</p>
          <p className='text-sm text-red-600'>↓ 1.2% from last month</p>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-8'>
        <div className='h-80'>
          <h3 className='text-lg font-medium text-gray-900 mb-4'>
            User Distribution
          </h3>
          <ResponsiveContainer width='100%' height='100%'>
            <PieChart>
              <Pie
                data={userData}
                cx='50%'
                cy='50%'
                labelLine={false}
                outerRadius={80}
                fill='#8884d8'
                dataKey='value'
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {userData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className='h-80'>
          <h3 className='text-lg font-medium text-gray-900 mb-4'>
            User Activity
          </h3>
          <div className='bg-gray-50 p-4 rounded-lg h-full flex items-center justify-center'>
            <div className='text-center'>
              <FaChartPie className='mx-auto text-4xl text-gray-400 mb-2' />
              <p className='text-gray-500'>
                Activity chart will be displayed here
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className='overflow-x-auto'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                User Segment
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Count
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Conversion Rate
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Avg. Order Value
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            <tr>
              <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                New Customers
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                1,254
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                12.5%
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                $89.50
              </td>
            </tr>
            <tr>
              <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                Returning Customers
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                3,421
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                24.8%
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                $134.20
              </td>
            </tr>
            <tr>
              <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                Loyal Customers
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                842
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                38.6%
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                $187.90
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SuperAdminUserAnalytics
