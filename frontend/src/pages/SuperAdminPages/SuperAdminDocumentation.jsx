import {
  FaBook,
  FaSearch,
  FaQuestionCircle,
  FaVideo,
  FaFileAlt,
  FaUserShield,
  FaUsers,
  FaCog,
  FaShieldAlt,
  FaKey,
  FaDatabase,
  FaHistory,
} from 'react-icons/fa'
import { useState } from 'react'

const documentationCategories = [
  {
    name: 'Getting Started',
    items: [
      { title: 'SuperAdmin Overview', icon: <FaBook className='mr-2' /> },
      {
        title: 'First Time Setup',
        icon: <FaQuestionCircle className='mr-2' />,
      },
      { title: 'User Permissions', icon: <FaUserShield className='mr-2' /> },
    ],
  },
  {
    name: 'Administration',
    items: [
      { title: 'User Management', icon: <FaUsers className='mr-2' /> },
      { title: 'System Settings', icon: <FaCog className='mr-2' /> },
      {
        title: 'Security Configuration',
        icon: <FaShieldAlt className='mr-2' />,
      },
    ],
  },
  {
    name: 'Advanced Features',
    items: [
      { title: 'API Integration', icon: <FaKey className='mr-2' /> },
      { title: 'Database Management', icon: <FaDatabase className='mr-2' /> },
      { title: 'Backup Strategies', icon: <FaHistory className='mr-2' /> },
    ],
  },
]

const videoTutorials = [
  { title: 'SuperAdmin Dashboard Tour', duration: '12:45', views: '1.2K' },
  { title: 'User Permission Setup', duration: '8:30', views: '856' },
  { title: 'Security Best Practices', duration: '15:20', views: '1.5K' },
  { title: 'API Management Guide', duration: '10:15', views: '923' },
]

const SuperAdminDocumentation = () => {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className='bg-white rounded-lg shadow-md p-6 overflow-y-auto max-h-[calc(100vh-200px)]'>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-6'>
        <h2 className='text-2xl font-bold text-gray-800 flex items-center'>
          <FaBook className='mr-2 text-superadmin-600'  />
          Documentation Center
        </h2>
        <div className='mt-3 md:mt-0 w-full md:w-64'>
          <div className='relative'>
            <FaSearch className='absolute left-3 top-3 text-gray-400' />
            <input
              type='text'
              placeholder='Search documentation...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-superadmin-500 focus:border-superadmin-500'
            />
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
        <div className='bg-blue-50 p-6 rounded-lg border border-blue-100'>
          <div className='flex items-center mb-4'>
            <div className='p-3 rounded-full bg-blue-100 text-blue-600 mr-4'>
              <FaBook className='text-xl' />
            </div>
            <h3 className='text-lg font-medium text-gray-900'>Guides</h3>
          </div>
          <p className='text-sm text-gray-600 mb-4'>
            Comprehensive written guides covering all aspects of the SuperAdmin
            system.
          </p>
          <button className='text-sm text-blue-600 hover:text-blue-700'>
            View All Guides →
          </button>
        </div>

        <div className='bg-purple-50 p-6 rounded-lg border border-purple-100'>
          <div className='flex items-center mb-4'>
            <div className='p-3 rounded-full bg-purple-100 text-purple-600 mr-4'>
              <FaVideo className='text-xl' />
            </div>
            <h3 className='text-lg font-medium text-gray-900'>
              Video Tutorials
            </h3>
          </div>
          <p className='text-sm text-gray-600 mb-4'>
            Step-by-step video tutorials to help you master the SuperAdmin
            features.
          </p>
          <button className='text-sm text-purple-600 hover:text-purple-700'>
            Browse Videos →
          </button>
        </div>

        <div className='bg-green-50 p-6 rounded-lg border border-green-100'>
          <div className='flex items-center mb-4'>
            <div className='p-3 rounded-full bg-green-100 text-green-600 mr-4'>
              <FaFileAlt className='text-xl' />
            </div>
            <h3 className='text-lg font-medium text-gray-900'>API Reference</h3>
          </div>
          <p className='text-sm text-gray-600 mb-4'>
            Complete technical documentation for the SuperAdmin API endpoints.
          </p>
          <button className='text-sm text-green-600 hover:text-green-700'>
            API Docs →
          </button>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-8'>
        <div>
          <h3 className='text-lg font-medium text-gray-900 mb-4'>
            Documentation Categories
          </h3>
          <div className='space-y-6'>
            {documentationCategories.map((category) => (
              <div
                key={category.name}
                className='border border-gray-200 rounded-lg overflow-hidden'
              >
                <div className='bg-gray-50 px-4 py-3 border-b border-gray-200'>
                  <h4 className='font-medium text-gray-900'>{category.name}</h4>
                </div>
                <div className='divide-y divide-gray-200'>
                  {category.items.map((item, index) => (
                    <div
                      key={index}
                      className='px-4 py-3 hover:bg-gray-50 cursor-pointer'
                    >
                      <div className='flex items-center'>
                        {item.icon}
                        <span>{item.title}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className='text-lg font-medium text-gray-900 mb-4'>
            Popular Video Tutorials
          </h3>
          <div className='space-y-4'>
            {videoTutorials.map((video, index) => (
              <div
                key={index}
                className='border border-gray-200 rounded-lg p-4 hover:border-superadmin-500 transition-colors cursor-pointer'
              >
                <div className='flex items-start'>
                  <div className='bg-superadmin-100 text-superadmin-600 p-3 rounded-lg mr-4'>
                    <FaVideo className='text-xl' />
                  </div>
                  <div>
                    <h4 className='font-medium text-gray-900'>{video.title}</h4>
                    <div className='flex items-center mt-1 text-sm text-gray-500'>
                      <span>{video.duration}</span>
                      <span className='mx-2'>•</span>
                      <span>{video.views} views</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='bg-gray-50 p-6 rounded-lg border border-gray-200'>
        <h3 className='text-lg font-medium text-gray-900 mb-4 flex items-center'>
          <FaQuestionCircle className='mr-2 text-superadmin-600' />
          Need Help?
        </h3>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <h4 className='font-medium text-gray-900 mb-2'>Contact Support</h4>
            <p className='text-sm text-gray-600 mb-3'>
              Our support team is available 24/7 to help with any questions or
              issues.
            </p>
            <button className='bg-superadmin-600 hover:bg-superadmin-700 text-white px-4 py-2 rounded-md'>
              Open Support Ticket
            </button>
          </div>
          <div>
            <h4 className='font-medium text-gray-900 mb-2'>Community Forum</h4>
            <p className='text-sm text-gray-600 mb-3'>
              Connect with other SuperAdmin users and share knowledge.
            </p>
            <button className='border border-gray-300 hover:bg-gray-100 px-4 py-2 rounded-md'>
              Visit Community
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SuperAdminDocumentation
