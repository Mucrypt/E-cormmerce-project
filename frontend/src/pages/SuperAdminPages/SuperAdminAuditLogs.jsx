import {
  FaHistory,
  FaSearch,
  FaUser,
  FaServer,
  FaDatabase,
  FaShieldAlt,
} from 'react-icons/fa'
import { useState } from 'react'

const auditLogs = [
  {
    id: 1,
    action: 'User login',
    user: 'superadmin@example.com',
    ip: '192.168.1.100',
    timestamp: '2023-05-20 14:30:45',
    type: 'authentication',
  },
  {
    id: 2,
    action: 'Product updated',
    user: 'admin@example.com',
    ip: '10.0.0.2',
    timestamp: '2023-05-20 13:15:22',
    type: 'content',
  },
  {
    id: 3,
    action: 'User created',
    user: 'superadmin@example.com',
    ip: '192.168.1.100',
    timestamp: '2023-05-20 11:45:10',
    type: 'users',
  },
  {
    id: 4,
    action: 'Database backup',
    user: 'system',
    ip: '127.0.0.1',
    timestamp: '2023-05-20 02:30:00',
    type: 'system',
  },
  {
    id: 5,
    action: 'Permission changed',
    user: 'superadmin@example.com',
    ip: '192.168.1.100',
    timestamp: '2023-05-19 16:20:33',
    type: 'security',
  },
]

const getTypeIcon = (type) => {
  switch (type) {
    case 'authentication':
      return <FaUser className='text-blue-500' />
    case 'content':
      return <FaDatabase className='text-green-500' />
    case 'users':
      return <FaUser className='text-purple-500' />
    case 'system':
      return <FaServer className='text-yellow-500' />
    case 'security':
      return <FaShieldAlt className='text-red-500' />
    default:
      return <FaHistory className='text-gray-500' />
  }
}

const SuperAdminAuditLogs = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('all')

  const filteredLogs = auditLogs.filter((log) => {
    if (selectedType !== 'all' && log.type !== selectedType) return false
    if (
      searchTerm &&
      !log.action.toLowerCase().includes(searchTerm.toLowerCase())
    )
      return false
    return true
  })

  return (
    <div className='bg-white rounded-lg shadow-md p-6 overflow-y-auto max-h-[calc(140vh-200px)]'>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-6'>
        <h2 className='text-2xl font-bold text-gray-800 flex items-center'>
          <FaHistory className='mr-2 text-superadmin-600' />
          Audit Logs
        </h2>
        <div className='flex space-x-3 mt-3 md:mt-0'>
          <div className='relative'>
            <FaSearch className='absolute left-3 top-3 text-gray-400' />
            <input
              type='text'
              placeholder='Search logs...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-superadmin-500 focus:border-superadmin-500'
            />
          </div>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className='border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-superadmin-500 focus:border-superadmin-500'
          >
            <option value='all'>All Types</option>
            <option value='authentication'>Authentication</option>
            <option value='content'>Content</option>
            <option value='users'>Users</option>
            <option value='system'>System</option>
            <option value='security'>Security</option>
          </select>
        </div>
      </div>

      <div className='overflow-x-auto'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Action
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                User
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                IP Address
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Timestamp
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Type
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {filteredLogs.map((log) => (
              <tr key={log.id} className='hover:bg-gray-50'>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='flex items-center'>
                    <div className='flex-shrink-0 h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-3'>
                      {getTypeIcon(log.type)}
                    </div>
                    <div className='text-sm font-medium text-gray-900'>
                      {log.action}
                    </div>
                  </div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  {log.user}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono'>
                  {log.ip}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  {log.timestamp}
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full capitalize ${
                      log.type === 'authentication'
                        ? 'bg-blue-100 text-blue-800'
                        : log.type === 'content'
                        ? 'bg-green-100 text-green-800'
                        : log.type === 'users'
                        ? 'bg-purple-100 text-purple-800'
                        : log.type === 'system'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {log.type}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='mt-6 flex justify-between items-center'>
        <div className='text-sm text-gray-600'>
          Showing 1 to {filteredLogs.length} of {filteredLogs.length} entries
        </div>
        <div className='flex space-x-2'>
          <button className='px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100'>
            Previous
          </button>
          <button className='px-3 py-1 bg-superadmin-600 text-white rounded-md hover:bg-superadmin-700'>
            1
          </button>
          <button className='px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100'>
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default SuperAdminAuditLogs
