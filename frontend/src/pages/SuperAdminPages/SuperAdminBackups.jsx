import {
  FaDownload,
  FaUpload,
  FaTrash,
  FaHistory,
  FaServer,
  FaDatabase,
} from 'react-icons/fa'
import { useState } from 'react'

const backups = [
  {
    id: 1,
    name: 'Full Backup - May 20',
    type: 'Full',
    size: '4.2 GB',
    created: '2023-05-20 02:30 UTC',
    status: 'completed',
  },
  {
    id: 2,
    name: 'Incremental - May 19',
    type: 'Incremental',
    size: '1.1 GB',
    created: '2023-05-19 02:30 UTC',
    status: 'completed',
  },
  {
    id: 3,
    name: 'Full Backup - May 13',
    type: 'Full',
    size: '4.0 GB',
    created: '2023-05-13 02:30 UTC',
    status: 'completed',
  },
  {
    id: 4,
    name: 'Incremental - May 18',
    type: 'Incremental',
    size: '0.9 GB',
    created: '2023-05-18 02:30 UTC',
    status: 'failed',
  },
]

const SuperAdminBackups = () => {
  const [selectedAction, setSelectedAction] = useState('backup')
  const [backupType, setBackupType] = useState('full')
  const [isCreatingBackup, setIsCreatingBackup] = useState(false)

  const handleCreateBackup = () => {
    setIsCreatingBackup(true)
    // Simulate backup creation
    setTimeout(() => {
      setIsCreatingBackup(false)
      alert(`Backup created successfully! Type: ${backupType}`)
    }, 2000)
  }

  return (
    <div className='bg-white rounded-lg shadow-md p-6 overflow-y-auto max-h-[calc(100vh-200px)]'>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-6'>
        <h2 className='text-2xl font-bold text-gray-800 flex items-center'>
          <FaDatabase className='mr-2 text-superadmin-600' />
          Backup Management
        </h2>
        <div className='flex space-x-3 mt-3 md:mt-0'>
          <button
            onClick={() => setSelectedAction('backup')}
            className={`${
              selectedAction === 'backup'
                ? 'bg-superadmin-600 text-white'
                : 'border border-gray-300 hover:bg-gray-100'
            } px-4 py-2 rounded-md flex items-center`}
          >
            <FaDownload className='mr-2' />
            Backups
          </button>
          <button
            onClick={() => setSelectedAction('restore')}
            className={`${
              selectedAction === 'restore'
                ? 'bg-superadmin-600 text-white'
                : 'border border-gray-300 hover:bg-gray-100'
            } px-4 py-2 rounded-md flex items-center`}
          >
            <FaUpload className='mr-2' />
            Restore
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
                Total Backups
              </h3>
              <p className='text-2xl font-semibold text-gray-900'>24</p>
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
                Storage Used
              </h3>
              <p className='text-2xl font-semibold text-gray-900'>42.5 GB</p>
            </div>
          </div>
        </div>
        <div className='bg-gray-50 p-4 rounded-lg'>
          <div className='flex items-center'>
            <div className='p-3 rounded-full bg-yellow-100 text-yellow-600 mr-4'>
              <FaHistory className='text-xl' />
            </div>
            <div>
              <h3 className='text-sm font-medium text-gray-500'>Last Backup</h3>
              <p className='text-2xl font-semibold text-gray-900'>Today</p>
            </div>
          </div>
        </div>
      </div>

      {selectedAction === 'backup' && (
        <div className='space-y-6'>
          <div className='flex flex-col md:flex-row justify-between items-start md:items-center'>
            <div>
              <h3 className='text-lg font-medium text-gray-900'>
                Create New Backup
              </h3>
              <p className='mt-1 text-sm text-gray-500'>
                Generate a new backup of your system data.
              </p>
            </div>
            <div className='mt-4 md:mt-0 flex space-x-3'>
              <select
                value={backupType}
                onChange={(e) => setBackupType(e.target.value)}
                className='border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-superadmin-500 focus:border-superadmin-500'
              >
                <option value='full'>Full Backup</option>
                <option value='incremental'>Incremental Backup</option>
                <option value='database'>Database Only</option>
              </select>
              <button
                onClick={handleCreateBackup}
                disabled={isCreatingBackup}
                className='bg-superadmin-600 hover:bg-superadmin-700 text-white px-4 py-2 rounded-md flex items-center'
              >
                {isCreatingBackup ? 'Creating...' : 'Start Backup'}
              </button>
            </div>
          </div>

          <div className='overflow-x-auto'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-50'>
                <tr>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Name
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Type
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Size
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Created
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
                {backups.map((backup) => (
                  <tr key={backup.id}>
                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                      {backup.name}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                      {backup.type}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                      {backup.size}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                      {backup.created}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          backup.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {backup.status.charAt(0).toUpperCase() +
                          backup.status.slice(1)}
                      </span>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                      <button className='text-superadmin-600 hover:text-superadmin-700 mr-3'>
                        <FaDownload />
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
      )}

      {selectedAction === 'restore' && (
        <div className='space-y-6'>
          <div>
            <h3 className='text-lg font-medium text-gray-900'>
              Restore From Backup
            </h3>
            <p className='mt-1 text-sm text-gray-500'>
              Upload a backup file or select from existing backups to restore
              your system.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='bg-gray-50 p-6 rounded-lg border border-gray-200'>
              <h4 className='font-medium text-gray-900 mb-4 flex items-center'>
                <FaUpload className='mr-2 text-superadmin-600' />
                Upload Backup File
              </h4>
              <div className='border-2 border-dashed border-gray-300 rounded-lg p-8 text-center'>
                <div className='flex justify-center'>
                  <FaDatabase className='text-4xl text-gray-400' />
                </div>
                <p className='mt-2 text-sm text-gray-600'>
                  Drag and drop backup files here, or click to browse
                </p>
                <button className='mt-4 bg-superadmin-600 hover:bg-superadmin-700 text-white px-4 py-2 rounded-md'>
                  Select Files
                </button>
              </div>
            </div>

            <div className='bg-gray-50 p-6 rounded-lg border border-gray-200'>
              <h4 className='font-medium text-gray-900 mb-4 flex items-center'>
                <FaHistory className='mr-2 text-superadmin-600' />
                Select Existing Backup
              </h4>
              <select className='w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-superadmin-500 focus:border-superadmin-500'>
                <option>Select a backup...</option>
                {backups.map((backup) => (
                  <option key={backup.id} value={backup.id}>
                    {backup.name}
                  </option>
                ))}
              </select>
              <div className='space-y-3'>
                <div className='flex items-center'>
                  <input
                    id='restoreDatabase'
                    name='restoreDatabase'
                    type='checkbox'
                    className='focus:ring-superadmin-500 h-4 w-4 text-superadmin-600 border-gray-300 rounded'
                  />
                  <label
                    htmlFor='restoreDatabase'
                    className='ml-2 block text-sm text-gray-700'
                  >
                    Restore Database
                  </label>
                </div>
                <div className='flex items-center'>
                  <input
                    id='restoreFiles'
                    name='restoreFiles'
                    type='checkbox'
                    className='focus:ring-superadmin-500 h-4 w-4 text-superadmin-600 border-gray-300 rounded'
                  />
                  <label
                    htmlFor='restoreFiles'
                    className='ml-2 block text-sm text-gray-700'
                  >
                    Restore Files
                  </label>
                </div>
                <div className='flex items-center'>
                  <input
                    id='restoreSettings'
                    name='restoreSettings'
                    type='checkbox'
                    className='focus:ring-superadmin-500 h-4 w-4 text-superadmin-600 border-gray-300 rounded'
                  />
                  <label
                    htmlFor='restoreSettings'
                    className='ml-2 block text-sm text-gray-700'
                  >
                    Restore Settings
                  </label>
                </div>
              </div>
              <button className='mt-6 w-full bg-superadmin-600 hover:bg-superadmin-700 text-white py-2 px-4 rounded-md'>
                Start Restoration
              </button>
            </div>
          </div>
        </div>
      )}

      <div className='mt-8 bg-gray-50 p-6 rounded-lg border border-gray-200'>
        <h3 className='text-lg font-medium text-gray-900 mb-4'>
          Backup Settings
        </h3>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <label
              htmlFor='backupSchedule'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Automatic Backup Schedule
            </label>
            <select
              id='backupSchedule'
              className='block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-superadmin-500 focus:border-superadmin-500 sm:text-sm'
            >
              <option>Daily</option>
              <option>Weekly</option>
              <option>Monthly</option>
              <option>Disabled</option>
            </select>
          </div>
          <div>
            <label
              htmlFor='backupRetention'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Backup Retention Period
            </label>
            <select
              id='backupRetention'
              className='block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-superadmin-500 focus:border-superadmin-500 sm:text-sm'
            >
              <option>7 days</option>
              <option>14 days</option>
              <option>30 days</option>
              <option>90 days</option>
            </select>
          </div>
        </div>
        <button className='mt-6 bg-superadmin-600 hover:bg-superadmin-700 text-white px-4 py-2 rounded-md'>
          Save Settings
        </button>
      </div>
    </div>
  )
}

export default SuperAdminBackups
