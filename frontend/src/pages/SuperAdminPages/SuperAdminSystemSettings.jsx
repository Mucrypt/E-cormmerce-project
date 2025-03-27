import {
  FaCog,
  FaSave,
  FaUndo,
  FaServer,

  FaBell,
  FaShieldAlt,
} from 'react-icons/fa'
import { useState } from 'react'

const SuperAdminSystemSettings = () => {
  const [settings, setSettings] = useState({
    siteName: 'My E-Commerce',
    siteUrl: 'https://myecommerce.com',
    timezone: 'UTC',
    maintenanceMode: false,
    emailNotifications: true,
    securityLevel: 'high',
    cacheEnabled: true,
    analyticsEnabled: true,
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setSettings((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Save settings logic here
    alert('Settings saved successfully!')
  }

  const handleReset = () => {
    if (
      window.confirm('Are you sure you want to reset all settings to default?')
    ) {
      setSettings({
        siteName: 'My E-Commerce',
        siteUrl: 'https://myecommerce.com',
        timezone: 'UTC',
        maintenanceMode: false,
        emailNotifications: true,
        securityLevel: 'high',
        cacheEnabled: true,
        analyticsEnabled: true,
      })
    }
  }

  return (
    <div className='bg-white rounded-lg shadow-md p-6 overflow-y-auto max-h-[calc(100vh-200px)]'>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-6'>
        <h2 className='text-2xl font-bold text-gray-800 flex items-center'>
          <FaCog className='mr-2 text-superadmin-600' />
          System Settings
        </h2>
        <div className='flex space-x-3 mt-3 md:mt-0'>
          <button
            onClick={handleReset}
            className='border border-gray-300 hover:bg-gray-100 px-4 py-2 rounded-md flex items-center'
          >
            <FaUndo className='mr-2' />
            Reset Defaults
          </button>
          <button
            onClick={handleSubmit}
            className='bg-superadmin-600 hover:bg-superadmin-700 text-white px-4 py-2 rounded-md flex items-center'
          >
            <FaSave className='mr-2' />
            Save Settings
          </button>
        </div>
      </div>

      <form className='space-y-8 divide-y divide-gray-200'>
        <div className='space-y-6'>
          <div>
            <h3 className='text-lg font-medium text-gray-900 flex items-center'>
              <FaServer className='mr-2 text-gray-500' />
              General Settings
            </h3>
            <p className='mt-1 text-sm text-gray-500'>
              Configure basic system settings and preferences.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <label
                htmlFor='siteName'
                className='block text-sm font-medium text-gray-700'
              >
                Site Name
              </label>
              <input
                type='text'
                name='siteName'
                id='siteName'
                value={settings.siteName}
                onChange={handleChange}
                className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-superadmin-500 focus:border-superadmin-500 sm:text-sm'
              />
            </div>

            <div>
              <label
                htmlFor='siteUrl'
                className='block text-sm font-medium text-gray-700'
              >
                Site URL
              </label>
              <input
                type='url'
                name='siteUrl'
                id='siteUrl'
                value={settings.siteUrl}
                onChange={handleChange}
                className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-superadmin-500 focus:border-superadmin-500 sm:text-sm'
              />
            </div>

            <div>
              <label
                htmlFor='timezone'
                className='block text-sm font-medium text-gray-700'
              >
                Timezone
              </label>
              <select
                id='timezone'
                name='timezone'
                value={settings.timezone}
                onChange={handleChange}
                className='mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-superadmin-500 focus:border-superadmin-500 sm:text-sm rounded-md'
              >
                <option value='UTC'>UTC</option>
                <option value='EST'>Eastern Time (EST)</option>
                <option value='PST'>Pacific Time (PST)</option>
                <option value='CET'>Central European Time (CET)</option>
              </select>
            </div>

            <div className='flex items-start'>
              <div className='flex items-center h-5'>
                <input
                  id='maintenanceMode'
                  name='maintenanceMode'
                  type='checkbox'
                  checked={settings.maintenanceMode}
                  onChange={handleChange}
                  className='focus:ring-superadmin-500 h-4 w-4 text-superadmin-600 border-gray-300 rounded'
                />
              </div>
              <div className='ml-3 text-sm'>
                <label
                  htmlFor='maintenanceMode'
                  className='font-medium text-gray-700'
                >
                  Maintenance Mode
                </label>
                <p className='text-gray-500'>
                  Take the site offline for maintenance.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className='pt-8'>
          <div>
            <h3 className='text-lg font-medium text-gray-900 flex items-center'>
              <FaBell className='mr-2 text-gray-500' />
              Notification Settings
            </h3>
            <p className='mt-1 text-sm text-gray-500'>
              Configure how and when system notifications are sent.
            </p>
          </div>

          <div className='mt-6 grid grid-cols-1 gap-6'>
            <div className='flex items-start'>
              <div className='flex items-center h-5'>
                <input
                  id='emailNotifications'
                  name='emailNotifications'
                  type='checkbox'
                  checked={settings.emailNotifications}
                  onChange={handleChange}
                  className='focus:ring-superadmin-500 h-4 w-4 text-superadmin-600 border-gray-300 rounded'
                />
              </div>
              <div className='ml-3 text-sm'>
                <label
                  htmlFor='emailNotifications'
                  className='font-medium text-gray-700'
                >
                  Email Notifications
                </label>
                <p className='text-gray-500'>
                  Receive system notifications via email.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className='pt-8'>
          <div>
            <h3 className='text-lg font-medium text-gray-900 flex items-center'>
              <FaShieldAlt className='mr-2 text-gray-500' />
              Security Settings
            </h3>
            <p className='mt-1 text-sm text-gray-500'>
              Configure system security preferences and levels.
            </p>
          </div>

          <div className='mt-6 grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <label
                htmlFor='securityLevel'
                className='block text-sm font-medium text-gray-700'
              >
                Security Level
              </label>
              <select
                id='securityLevel'
                name='securityLevel'
                value={settings.securityLevel}
                onChange={handleChange}
                className='mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-superadmin-500 focus:border-superadmin-500 sm:text-sm rounded-md'
              >
                <option value='low'>Low</option>
                <option value='medium'>Medium</option>
                <option value='high'>High</option>
              </select>
            </div>

            <div className='flex items-start'>
              <div className='flex items-center h-5'>
                <input
                  id='cacheEnabled'
                  name='cacheEnabled'
                  type='checkbox'
                  checked={settings.cacheEnabled}
                  onChange={handleChange}
                  className='focus:ring-superadmin-500 h-4 w-4 text-superadmin-600 border-gray-300 rounded'
                />
              </div>
              <div className='ml-3 text-sm'>
                <label
                  htmlFor='cacheEnabled'
                  className='font-medium text-gray-700'
                >
                  Enable Caching
                </label>
                <p className='text-gray-500'>
                  Improve performance with caching.
                </p>
              </div>
            </div>

            <div className='flex items-start'>
              <div className='flex items-center h-5'>
                <input
                  id='analyticsEnabled'
                  name='analyticsEnabled'
                  type='checkbox'
                  checked={settings.analyticsEnabled}
                  onChange={handleChange}
                  className='focus:ring-superadmin-500 h-4 w-4 text-superadmin-600 border-gray-300 rounded'
                />
              </div>
              <div className='ml-3 text-sm'>
                <label
                  htmlFor='analyticsEnabled'
                  className='font-medium text-gray-700'
                >
                  Enable Analytics
                </label>
                <p className='text-gray-500'>
                  Collect system performance data.
                </p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default SuperAdminSystemSettings
