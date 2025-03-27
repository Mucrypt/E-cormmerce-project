import {
  FaHeadset,
  FaTicketAlt,
  FaSearch,
  FaClock,
  FaCheckCircle,
  FaExclamationTriangle,
} from 'react-icons/fa'
import { useState } from 'react'

const tickets = [
  {
    id: 'TKT-1001',
    subject: 'Cannot access admin dashboard',
    status: 'open',
    priority: 'high',
    created: '2023-05-20',
    updated: '2023-05-20',
  },
  {
    id: 'TKT-1002',
    subject: 'Payment gateway integration issue',
    status: 'in-progress',
    priority: 'medium',
    created: '2023-05-18',
    updated: '2023-05-19',
  },
  {
    id: 'TKT-1003',
    subject: 'Database performance questions',
    status: 'resolved',
    priority: 'low',
    created: '2023-05-15',
    updated: '2023-05-16',
  },
  {
    id: 'TKT-1004',
    subject: 'API documentation clarification',
    status: 'closed',
    priority: 'low',
    created: '2023-05-10',
    updated: '2023-05-12',
  },
]

const supportArticles = [
  {
    title: 'How to reset admin password',
    category: 'Administration',
    views: '1.2K',
  },
  {
    title: 'Troubleshooting database connections',
    category: 'Database',
    views: '856',
  },
  {
    title: 'Setting up two-factor authentication',
    category: 'Security',
    views: '1.5K',
  },
  { title: 'API rate limits and quotas', category: 'API', views: '923' },
]

const SuperAdminSupport = () => {
  const [activeTab, setActiveTab] = useState('tickets')
  const [newTicket, setNewTicket] = useState({
    subject: '',
    description: '',
    priority: 'medium',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewTicket((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmitTicket = (e) => {
    e.preventDefault()
    // Ticket submission logic would go here
    alert(`Ticket submitted: ${newTicket.subject}`)
    setNewTicket({
      subject: '',
      description: '',
      priority: 'medium',
    })
  }

  return (
    <div className='bg-white rounded-lg shadow-md p-6 overflow-y-auto max-h-[calc(100vh-200px)]'>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-6'>
        <h2 className='text-2xl font-bold text-gray-800 flex items-center'>
          <FaHeadset className='mr-2 text-superadmin-600' />
          Support Center
        </h2>
        <div className='flex space-x-3 mt-3 md:mt-0'>
          <button
            onClick={() => setActiveTab('tickets')}
            className={`${
              activeTab === 'tickets'
                ? 'bg-superadmin-600 text-white'
                : 'border border-gray-300 hover:bg-gray-100'
            } px-4 py-2 rounded-md flex items-center`}
          >
            <FaTicketAlt className='mr-2' />
            My Tickets
          </button>
          <button
            onClick={() => setActiveTab('new')}
            className={`${
              activeTab === 'new'
                ? 'bg-superadmin-600 text-white'
                : 'border border-gray-300 hover:bg-gray-100'
            } px-4 py-2 rounded-md flex items-center`}
          >
            + New Ticket
          </button>
        </div>
      </div>

      {activeTab === 'tickets' && (
        <div className='space-y-6'>
          <div className='flex flex-col md:flex-row justify-between items-start md:items-center'>
            <div>
              <h3 className='text-lg font-medium text-gray-900'>
                My Support Tickets
              </h3>
              <p className='mt-1 text-sm text-gray-500'>
                View and manage your existing support requests.
              </p>
            </div>
            <div className='mt-4 md:mt-0 w-full md:w-64'>
              <div className='relative'>
                <FaSearch className='absolute left-3 top-3 text-gray-400' />
                <input
                  type='text'
                  placeholder='Search tickets...'
                  className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-superadmin-500 focus:border-superadmin-500'
                />
              </div>
            </div>
          </div>

          <div className='overflow-x-auto'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-50'>
                <tr>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Ticket ID
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Subject
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Status
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Priority
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Created
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Last Updated
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {tickets.map((ticket) => (
                  <tr
                    key={ticket.id}
                    className='hover:bg-gray-50 cursor-pointer'
                  >
                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                      {ticket.id}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                      {ticket.subject}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          ticket.status === 'open'
                            ? 'bg-yellow-100 text-yellow-800'
                            : ticket.status === 'in-progress'
                            ? 'bg-blue-100 text-blue-800'
                            : ticket.status === 'resolved'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {ticket.status.replace('-', ' ')}
                      </span>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          ticket.priority === 'high'
                            ? 'bg-red-100 text-red-800'
                            : ticket.priority === 'medium'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {ticket.priority}
                      </span>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                      {ticket.created}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                      {ticket.updated}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'new' && (
        <div className='space-y-6'>
          <div>
            <h3 className='text-lg font-medium text-gray-900'>
              Create New Support Ticket
            </h3>
            <p className='mt-1 text-sm text-gray-500'>
              Fill out the form below to submit a new support request.
            </p>
          </div>

          <form onSubmit={handleSubmitTicket} className='space-y-6'>
            <div>
              <label
                htmlFor='subject'
                className='block text-sm font-medium text-gray-700'
              >
                Subject
              </label>
              <input
                type='text'
                id='subject'
                name='subject'
                value={newTicket.subject}
                onChange={handleInputChange}
                required
                className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-superadmin-500 focus:border-superadmin-500 sm:text-sm'
                placeholder='Briefly describe your issue'
              />
            </div>

            <div>
              <label
                htmlFor='priority'
                className='block text-sm font-medium text-gray-700'
              >
                Priority
              </label>
              <select
                id='priority'
                name='priority'
                value={newTicket.priority}
                onChange={handleInputChange}
                className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-superadmin-500 focus:border-superadmin-500 sm:text-sm'
              >
                <option value='low'>Low</option>
                <option value='medium'>Medium</option>
                <option value='high'>High</option>
                <option value='critical'>Critical</option>
              </select>
            </div>

            <div>
              <label
                htmlFor='description'
                className='block text-sm font-medium text-gray-700'
              >
                Description
              </label>
              <textarea
                id='description'
                name='description'
                rows={6}
                value={newTicket.description}
                onChange={handleInputChange}
                required
                className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-superadmin-500 focus:border-superadmin-500 sm:text-sm'
                placeholder='Provide detailed information about your issue'
              />
            </div>

            <div className='flex justify-end'>
              <button
                type='submit'
                className='bg-superadmin-600 hover:bg-superadmin-700 text-white px-4 py-2 rounded-md'
              >
                Submit Ticket
              </button>
            </div>
          </form>
        </div>
      )}

      <div className='mt-8'>
        <h3 className='text-lg font-medium text-gray-900 mb-4'>
          Knowledge Base
        </h3>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <h4 className='font-medium text-gray-900 mb-3 flex items-center'>
              <FaSearch className='mr-2 text-superadmin-600' />
              Popular Articles
            </h4>
            <div className='bg-gray-50 rounded-lg border border-gray-200 divide-y divide-gray-200'>
              {supportArticles.map((article, index) => (
                <div
                  key={index}
                  className='p-4 hover:bg-gray-100 cursor-pointer'
                >
                  <div className='flex justify-between'>
                    <span className='font-medium'>{article.title}</span>
                    <span className='text-sm text-gray-500'>
                      {article.views} views
                    </span>
                  </div>
                  <div className='text-sm text-gray-500 mt-1'>
                    {article.category}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className='font-medium text-gray-900 mb-3 flex items-center'>
              <FaHeadset className='mr-2 text-superadmin-600' />
              Support Options
            </h4>
            <div className='space-y-4'>
              <div className='border border-gray-200 rounded-lg p-4 hover:border-superadmin-500 transition-colors cursor-pointer'>
                <div className='flex items-start'>
                  <div className='bg-blue-100 text-blue-600 p-3 rounded-lg mr-4'>
                    <FaClock className='text-xl' />
                  </div>
                  <div>
                    <h5 className='font-medium text-gray-900'>
                      24/7 Live Chat
                    </h5>
                    <p className='text-sm text-gray-600 mt-1'>
                      Instant help from our support team
                    </p>
                  </div>
                </div>
              </div>
              <div className='border border-gray-200 rounded-lg p-4 hover:border-superadmin-500 transition-colors cursor-pointer'>
                <div className='flex items-start'>
                  <div className='bg-green-100 text-green-600 p-3 rounded-lg mr-4'>
                    <FaCheckCircle className='text-xl' />
                  </div>
                  <div>
                    <h5 className='font-medium text-gray-900'>
                      Community Forum
                    </h5>
                    <p className='text-sm text-gray-600 mt-1'>
                      Get answers from other users
                    </p>
                  </div>
                </div>
              </div>
              <div className='border border-gray-200 rounded-lg p-4 hover:border-superadmin-500 transition-colors cursor-pointer'>
                <div className='flex items-start'>
                  <div className='bg-yellow-100 text-yellow-600 p-3 rounded-lg mr-4'>
                    <FaExclamationTriangle className='text-xl' />
                  </div>
                  <div>
                    <h5 className='font-medium text-gray-900'>
                      Emergency Support
                    </h5>
                    <p className='text-sm text-gray-600 mt-1'>
                      Critical issues that need immediate attention
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SuperAdminSupport
