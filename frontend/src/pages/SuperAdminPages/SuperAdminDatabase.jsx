import {
  FaDatabase,
  FaDownload,
  FaUpload,
  FaTrash,
  FaHistory,
} from 'react-icons/fa'
import { useState } from 'react'

const databaseStats = {
  size: '4.2 GB',
  tables: 42,
  queries: '1,245/sec',
  backupSize: '3.8 GB',
  lastBackup: '2023-05-20 02:30 UTC',
}

const queryLogs = [
  {
    id: 1,
    query: 'SELECT * FROM users WHERE id = ?',
    time: '12:45:23',
    duration: '0.023s',
  },
  {
    id: 2,
    query: 'UPDATE products SET stock = stock - 1 WHERE id = ?',
    time: '12:45:21',
    duration: '0.015s',
  },
  {
    id: 3,
    query: 'INSERT INTO orders (user_id, total) VALUES (?, ?)',
    time: '12:45:18',
    duration: '0.018s',
  },
  {
    id: 4,
    query: 'SELECT * FROM products WHERE category_id = ?',
    time: '12:45:15',
    duration: '0.042s',
  },
]

const SuperAdminDatabase = () => {
  const [selectedAction, setSelectedAction] = useState('backup')

  return (
    <div className='bg-white rounded-lg shadow-md p-6 overflow-y-auto max-h-[calc(100vh-200px)]'>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-6'>
        <h2 className='text-2xl font-bold text-gray-800 flex items-center'>
          <FaDatabase className='mr-2 text-superadmin-600' />
          Database Management
        </h2>
        <div className='flex space-x-3 mt-3 md:mt-0'>
          <button className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center'>
            <FaTrash className='mr-2' />
            Flush Cache
          </button>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-8'>
        <div className='bg-gray-50 p-4 rounded-lg'>
          <h3 className='text-sm font-medium text-gray-500'>Database Size</h3>
          <p className='text-2xl font-semibold text-gray-900'>
            {databaseStats.size}
          </p>
        </div>
        <div className='bg-gray-50 p-4 rounded-lg'>
          <h3 className='text-sm font-medium text-gray-500'>Tables</h3>
          <p className='text-2xl font-semibold text-gray-900'>
            {databaseStats.tables}
          </p>
        </div>
        <div className='bg-gray-50 p-4 rounded-lg'>
          <h3 className='text-sm font-medium text-gray-500'>Queries/Sec</h3>
          <p className='text-2xl font-semibold text-gray-900'>
            {databaseStats.queries}
          </p>
        </div>
        <div className='bg-gray-50 p-4 rounded-lg'>
          <h3 className='text-sm font-medium text-gray-500'>Last Backup</h3>
          <p className='text-2xl font-semibold text-gray-900'>
            {databaseStats.lastBackup}
          </p>
        </div>
      </div>

      <div className='mb-8'>
        <div className='border-b border-gray-200'>
          <nav className='-mb-px flex space-x-8'>
            <button
              onClick={() => setSelectedAction('backup')}
              className={`${
                selectedAction === 'backup'
                  ? 'border-superadmin-500 text-superadmin-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
            >
              <FaDownload className='mr-2' />
              Backup
            </button>
            <button
              onClick={() => setSelectedAction('restore')}
              className={`${
                selectedAction === 'restore'
                  ? 'border-superadmin-500 text-superadmin-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
            >
              <FaUpload className='mr-2' />
              Restore
            </button>
            <button
              onClick={() => setSelectedAction('optimize')}
              className={`${
                selectedAction === 'optimize'
                  ? 'border-superadmin-500 text-superadmin-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
            >
              <FaDatabase className='mr-2' />
              Optimize
            </button>
            <button
              onClick={() => setSelectedAction('logs')}
              className={`${
                selectedAction === 'logs'
                  ? 'border-superadmin-500 text-superadmin-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
            >
              <FaHistory className='mr-2' />
              Query Logs
            </button>
          </nav>
        </div>
      </div>

      {selectedAction === 'backup' && (
        <div className='space-y-6'>
          <div>
            <h3 className='text-lg font-medium text-gray-900'>
              Create Database Backup
            </h3>
            <p className='mt-1 text-sm text-gray-500'>
              Generate a complete backup of your database. This may take several
              minutes depending on database size.
            </p>
          </div>
          <div className='bg-gray-50 p-6 rounded-lg border border-gray-200'>
            <div className='flex flex-col md:flex-row justify-between items-start md:items-center'>
              <div>
                <h4 className='font-medium text-gray-900'>
                  Full Database Backup
                </h4>
                <p className='text-sm text-gray-500 mt-1'>
                  Estimated size: {databaseStats.backupSize}
                </p>
              </div>
              <button className='mt-4 md:mt-0 bg-superadmin-600 hover:bg-superadmin-700 text-white px-4 py-2 rounded-md flex items-center'>
                <FaDownload className='mr-2' />
                Start Backup
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedAction === 'restore' && (
        <div className='space-y-6'>
          <div>
            <h3 className='text-lg font-medium text-gray-900'>
              Restore Database
            </h3>
            <p className='mt-1 text-sm text-gray-500'>
              Upload a backup file to restore your database. This will overwrite
              all current data.
            </p>
          </div>
          <div className='bg-gray-50 p-6 rounded-lg border border-gray-200'>
            <div className='flex flex-col md:flex-row justify-between items-start md:items-center'>
              <div>
                <h4 className='font-medium text-gray-900'>
                  Upload Backup File
                </h4>
                <p className='text-sm text-gray-500 mt-1'>
                  Supported formats: .sql, .gz, .zip
                </p>
              </div>
              <div className='mt-4 md:mt-0'>
                <label className='cursor-pointer bg-superadmin-600 hover:bg-superadmin-700 text-white px-4 py-2 rounded-md flex items-center'>
                  <FaUpload className='mr-2' />
                  Choose File
                  <input type='file' className='hidden' />
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedAction === 'optimize' && (
        <div className='space-y-6'>
          <div>
            <h3 className='text-lg font-medium text-gray-900'>
              Database Optimization
            </h3>
            <p className='mt-1 text-sm text-gray-500'>
              Optimize database tables to improve performance and reclaim unused
              space.
            </p>
          </div>
          <div className='bg-gray-50 p-6 rounded-lg border border-gray-200'>
            <div className='flex flex-col md:flex-row justify-between items-start md:items-center'>
              <div>
                <h4 className='font-medium text-gray-900'>
                  Optimize All Tables
                </h4>
                <p className='text-sm text-gray-500 mt-1'>
                  This may take several minutes for large databases
                </p>
              </div>
              <button className='mt-4 md:mt-0 bg-superadmin-600 hover:bg-superadmin-700 text-white px-4 py-2 rounded-md'>
                Run Optimization
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedAction === 'logs' && (
        <div className='space-y-6'>
          <div>
            <h3 className='text-lg font-medium text-gray-900'>
              Recent Query Logs
            </h3>
            <p className='mt-1 text-sm text-gray-500'>
              The most recent database queries executed by the system.
            </p>
          </div>
          <div className='overflow-x-auto'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-50'>
                <tr>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Time
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Query
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Duration
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {queryLogs.map((log) => (
                  <tr key={log.id}>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                      {log.time}
                    </td>
                    <td className='px-6 py-4 text-sm text-gray-500 font-mono'>
                      {log.query}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                      {log.duration}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default SuperAdminDatabase
