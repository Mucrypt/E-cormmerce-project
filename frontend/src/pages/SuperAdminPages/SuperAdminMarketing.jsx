import {
  FaBullhorn,
  FaChartLine,
  FaEnvelope,
  FaPercentage,
} from 'react-icons/fa'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const campaignData = [
  { name: 'Email Blast', clicks: 4000, conversions: 1200, cost: 1200 },
  { name: 'Social Media', clicks: 3000, conversions: 800, cost: 1500 },
  { name: 'Google Ads', clicks: 2000, conversions: 600, cost: 1800 },
  { name: 'Affiliate', clicks: 2780, conversions: 1000, cost: 800 },
  { name: 'Influencer', clicks: 1890, conversions: 700, cost: 2000 },
]

const SuperAdminMarketing = () => {
  return (
    <div className='bg-white rounded-lg shadow-md p-6 overflow-y-auto max-h-[calc(100vh-200px)] '>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-6'>
        <h2 className='text-2xl font-bold text-gray-800 flex items-center'>
          <FaBullhorn className='mr-2 text-superadmin-600' />
          Marketing Campaigns
        </h2>
        <div className='flex space-x-3 mt-3 md:mt-0'>
          <button className='bg-superadmin-600 hover:bg-superadmin-700 text-white px-4 py-2 rounded-md'>
            + New Campaign
          </button>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-8'>
        <div className='bg-gray-50 p-4 rounded-lg'>
          <h3 className='text-sm font-medium text-gray-500'>
            Active Campaigns
          </h3>
          <p className='text-2xl font-semibold text-gray-900'>8</p>
        </div>
        <div className='bg-gray-50 p-4 rounded-lg'>
          <h3 className='text-sm font-medium text-gray-500'>Total Spend</h3>
          <p className='text-2xl font-semibold text-gray-900'>$7,300</p>
        </div>
        <div className='bg-gray-50 p-4 rounded-lg'>
          <h3 className='text-sm font-medium text-gray-500'>Avg. CTR</h3>
          <p className='text-2xl font-semibold text-gray-900'>3.2%</p>
        </div>
        <div className='bg-gray-50 p-4 rounded-lg'>
          <h3 className='text-sm font-medium text-gray-500'>ROI</h3>
          <p className='text-2xl font-semibold text-gray-900'>4.8x</p>
        </div>
      </div>

      <div className='h-80 mb-8'>
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart data={campaignData}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='name' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey='clicks' fill='#4299e1' name='Clicks' />
            <Bar dataKey='conversions' fill='#48bb78' name='Conversions' />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className='overflow-x-auto'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Campaign
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Channel
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Status
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Clicks
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Conversions
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Cost
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                ROI
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {campaignData.map((campaign) => (
              <tr key={campaign.name}>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                  {campaign.name}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  {campaign.name === 'Email Blast' ? (
                    <FaEnvelope className='inline mr-1' />
                  ) : campaign.name === 'Social Media' ? (
                    <FaBullhorn className='inline mr-1' />
                  ) : (
                    <FaChartLine className='inline mr-1' />
                  )}
                  {campaign.name}
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
                    Active
                  </span>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  {campaign.clicks.toLocaleString()}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  {campaign.conversions.toLocaleString()}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  ${campaign.cost.toLocaleString()}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  <span className='flex items-center'>
                    <FaPercentage className='mr-1 text-xs' />
                    {((campaign.conversions * 100) / campaign.cost).toFixed(1)}x
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SuperAdminMarketing
