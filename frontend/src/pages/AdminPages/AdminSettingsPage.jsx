import { useState } from 'react'
import { FaCog, FaSave, FaUndo, FaBell, FaCreditCard } from 'react-icons/fa'

const AdminSettingsPage = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState('general')

  // State for form inputs
  const [generalSettings, setGeneralSettings] = useState({
    storeName: 'My Store',
    storeEmail: 'store@example.com',
    currency: 'USD',
  })

  const [paymentSettings, setPaymentSettings] = useState({
    paymentGateway: 'Stripe',
    testMode: true,
  })

  const [shippingSettings, setShippingSettings] = useState({
    shippingMethod: 'Standard',
    freeShippingThreshold: 50,
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
  })

  // State for loading
  const [isLoading, setIsLoading] = useState(false)

  // Handle saving settings
  const handleSaveSettings = () => {
    setIsLoading(true)
    // Simulate API call to save settings
    setTimeout(() => {
      setIsLoading(false)
      alert('Settings saved successfully!')
    }, 1000)
  }

  // Handle resetting settings
  const handleResetSettings = () => {
    if (window.confirm('Are you sure you want to reset settings to default?')) {
      setGeneralSettings({
        storeName: 'My Store',
        storeEmail: 'store@example.com',
        currency: 'USD',
      })
      setPaymentSettings({
        paymentGateway: 'Stripe',
        testMode: true,
      })
      setShippingSettings({
        shippingMethod: 'Standard',
        freeShippingThreshold: 50,
      })
      setNotificationSettings({
        emailNotifications: true,
        smsNotifications: false,
      })
      alert('Settings reset to default!')
    }
  }

  // Handle testing notifications
  const handleTestNotification = () => {
    alert('Test notification sent!')
  }

  // Handle testing payment gateway
  const handleTestPaymentGateway = () => {
    alert('Payment gateway test successful!')
  }

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-semibold mb-6'>Settings</h1>
      <div className='bg-white p-6 rounded-lg shadow-md'>
        {/* Header */}
        <div className='flex items-center space-x-4 mb-6'>
          <FaCog className='text-3xl text-blue-500' />
          <div>
            <p className='text-gray-600'>Store Settings</p>
            <p className='text-2xl font-bold'>General</p>
          </div>
        </div>

        {/* Tabs */}
        <div className='flex space-x-4 mb-6'>
          <button
            onClick={() => setActiveTab('general')}
            className={`px-4 py-2 rounded-md ${
              activeTab === 'general'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            General
          </button>
          <button
            onClick={() => setActiveTab('payment')}
            className={`px-4 py-2 rounded-md ${
              activeTab === 'payment'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Payment
          </button>
          <button
            onClick={() => setActiveTab('shipping')}
            className={`px-4 py-2 rounded-md ${
              activeTab === 'shipping'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Shipping
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`px-4 py-2 rounded-md ${
              activeTab === 'notifications'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Notifications
          </button>
        </div>

        {/* General Settings */}
        {activeTab === 'general' && (
          <div className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Store Name
              </label>
              <input
                type='text'
                value={generalSettings.storeName}
                onChange={(e) =>
                  setGeneralSettings({
                    ...generalSettings,
                    storeName: e.target.value,
                  })
                }
                className='w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Store Email
              </label>
              <input
                type='email'
                value={generalSettings.storeEmail}
                onChange={(e) =>
                  setGeneralSettings({
                    ...generalSettings,
                    storeEmail: e.target.value,
                  })
                }
                className='w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Currency
              </label>
              <select
                value={generalSettings.currency}
                onChange={(e) =>
                  setGeneralSettings({
                    ...generalSettings,
                    currency: e.target.value,
                  })
                }
                className='w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              >
                <option value='USD'>USD</option>
                <option value='EUR'>EUR</option>
                <option value='GBP'>GBP</option>
              </select>
            </div>
          </div>
        )}

        {/* Payment Settings */}
        {activeTab === 'payment' && (
          <div className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Payment Gateway
              </label>
              <select
                value={paymentSettings.paymentGateway}
                onChange={(e) =>
                  setPaymentSettings({
                    ...paymentSettings,
                    paymentGateway: e.target.value,
                  })
                }
                className='w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              >
                <option value='Stripe'>Stripe</option>
                <option value='PayPal'>PayPal</option>
                <option value='Square'>Square</option>
              </select>
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Test Mode
              </label>
              <input
                type='checkbox'
                checked={paymentSettings.testMode}
                onChange={(e) =>
                  setPaymentSettings({
                    ...paymentSettings,
                    testMode: e.target.checked,
                  })
                }
                className='mr-2'
              />
              <span>Enable Test Mode</span>
            </div>
            <button
              onClick={handleTestPaymentGateway}
              className='bg-blue-500 text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-blue-600 transition-colors'
            >
              <FaCreditCard />
              <span>Test Payment Gateway</span>
            </button>
          </div>
        )}

        {/* Shipping Settings */}
        {activeTab === 'shipping' && (
          <div className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Shipping Method
              </label>
              <select
                value={shippingSettings.shippingMethod}
                onChange={(e) =>
                  setShippingSettings({
                    ...shippingSettings,
                    shippingMethod: e.target.value,
                  })
                }
                className='w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              >
                <option value='Standard'>Standard</option>
                <option value='Express'>Express</option>
                <option value='Overnight'>Overnight</option>
              </select>
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Free Shipping Threshold
              </label>
              <input
                type='number'
                value={shippingSettings.freeShippingThreshold}
                onChange={(e) =>
                  setShippingSettings({
                    ...shippingSettings,
                    freeShippingThreshold: e.target.value,
                  })
                }
                className='w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
          </div>
        )}

        {/* Notification Settings */}
        {activeTab === 'notifications' && (
          <div className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Email Notifications
              </label>
              <input
                type='checkbox'
                checked={notificationSettings.emailNotifications}
                onChange={(e) =>
                  setNotificationSettings({
                    ...notificationSettings,
                    emailNotifications: e.target.checked,
                  })
                }
                className='mr-2'
              />
              <span>Enable Email Notifications</span>
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                SMS Notifications
              </label>
              <input
                type='checkbox'
                checked={notificationSettings.smsNotifications}
                onChange={(e) =>
                  setNotificationSettings({
                    ...notificationSettings,
                    smsNotifications: e.target.checked,
                  })
                }
                className='mr-2'
              />
              <span>Enable SMS Notifications</span>
            </div>
            <button
              onClick={handleTestNotification}
              className='bg-blue-500 text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-blue-600 transition-colors'
            >
              <FaBell />
              <span>Test Notification</span>
            </button>
          </div>
        )}

        {/* Save and Reset Buttons */}
        <div className='flex justify-end space-x-4 mt-6'>
          <button
            onClick={handleResetSettings}
            className='bg-gray-500 text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-gray-600 transition-colors'
          >
            <FaUndo />
            <span>Reset</span>
          </button>
          <button
            onClick={handleSaveSettings}
            disabled={isLoading}
            className='bg-blue-500 text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-blue-600 transition-colors'
          >
            <FaSave />
            <span>{isLoading ? 'Saving...' : 'Save'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdminSettingsPage
