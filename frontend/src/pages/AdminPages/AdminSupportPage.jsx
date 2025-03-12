// frontend/src/pages/AdminSupportPage.jsx
import {  } from 'react-icons/fa'

const AdminSupportPage = () => {
  const tickets = [
    {
      id: 1,
      customer: 'John Doe',
      issue: 'Order not delivered',
      status: 'Open',
    },
    {
      id: 2,
      customer: 'Jane Smith',
      issue: 'Payment issue',
      status: 'Resolved',
    },
  ]

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-semibold mb-6'>Support Tickets</h1>
      <div className='bg-white p-6 rounded-lg shadow-md'>
        <table className='w-full'>
          <thead>
            <tr className='border-b'>
              <th className='text-left p-2'>Customer</th>
              <th className='text-left p-2'>Issue</th>
              <th className='text-left p-2'>Status</th>
              <th className='text-left p-2'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.id} className='border-b'>
                <td className='p-2'>{ticket.customer}</td>
                <td className='p-2'>{ticket.issue}</td>
                <td className='p-2'>{ticket.status}</td>
                <td className='p-2'>
                  <button className='text-blue-500 hover:text-blue-700'>
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminSupportPage
