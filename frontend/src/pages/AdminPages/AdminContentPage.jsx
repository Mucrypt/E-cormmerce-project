import { useState } from 'react'
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

const AdminContentPage = () => {
  // Mock data for content
  const [content, setContent] = useState([
    {
      id: 1,
      title: 'Blog Post 1',
      type: 'Blog',
      status: 'Published',
      body: '<p>This is a sample blog post.</p>',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      title: 'FAQ 1',
      type: 'FAQ',
      status: 'Draft',
      question: 'What is this FAQ about?',
      answer: 'This is a sample FAQ answer.',
    },
    {
      id: 3,
      title: 'Newsletter 1',
      type: 'Newsletter',
      status: 'Published',
      body: '<p>This is a sample newsletter.</p>',
      image: 'https://via.placeholder.com/150',
    },
  ])

  // State for the add/edit content modal
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentContent, setCurrentContent] = useState({
    id: '',
    title: '',
    type: '',
    status: 'Draft',
    body: '',
    image: '',
    question: '',
    answer: '',
  })

  // Tiptap editor instance
  const editor = useEditor({
    extensions: [StarterKit],
    content: currentContent.body,
    onUpdate: ({ editor }) => {
      setCurrentContent({ ...currentContent, body: editor.getHTML() })
    },
  })

  // Open the add content modal
  const openAddModal = () => {
    setCurrentContent({
      id: '',
      title: '',
      type: '',
      status: 'Draft',
      body: '',
      image: '',
      question: '',
      answer: '',
    })
    setIsModalOpen(true)
  }

  // Open the edit modal
  const openEditModal = (item) => {
    setCurrentContent(item)
    setIsModalOpen(true)
  }

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false)
  }

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCurrentContent({ ...currentContent, [name]: value })
  }

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setCurrentContent({ ...currentContent, image: reader.result })
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle adding/editing content
  const handleSaveContent = () => {
    if (!currentContent.title || !currentContent.type) return

    const newContent = {
      ...currentContent,
      id: currentContent.id || content.length + 1,
    }

    if (currentContent.id) {
      // Edit existing content
      setContent(
        content.map((item) =>
          item.id === currentContent.id ? newContent : item
        )
      )
    } else {
      // Add new content
      setContent([...content, newContent])
    }

    closeModal()
  }

  // Handle deleting content
  const handleDeleteContent = (id) => {
    if (window.confirm('Are you sure you want to delete this content?')) {
      setContent(content.filter((item) => item.id !== id))
    }
  }

  return (
    <div className='overflow-y-auto max-h-[calc(100vh-200px)] p-6'>
      <h1 className='text-2xl font-semibold mb-6 text-gray-800'>
        Manage Content
      </h1>
      <div className='bg-white p-6 rounded-lg shadow-md'>
        <div className='flex justify-end mb-4'>
          <button
            onClick={openAddModal}
            className='bg-defaul-button-colors text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-red-500 transition-colors'
          >
            <FaPlus />
            <span>Add Content</span>
          </button>
        </div>
        <table className='w-full'>
          <thead>
            <tr className='bg-gray-100 text-gray-700'>
              <th className='text-left p-3'>Title</th>
              <th className='text-left p-3'>Type</th>
              <th className='text-left p-3'>Status</th>
              <th className='text-left p-3'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {content.map((item) => (
              <tr
                key={item.id}
                className='border-b hover:bg-gray-50 transition-colors'
              >
                <td className='p-3 text-gray-700'>{item.title}</td>
                <td className='p-3 text-gray-700'>{item.type}</td>
                <td className='p-3 text-gray-700'>
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      item.status === 'Published'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className='p-3 flex space-x-4'>
                  <button
                    onClick={() => openEditModal(item)}
                    className='text-yellow-500 hover:text-yellow-700 bg-blue-100 px-2 py-1 rounded-md flex items-center space-x-1'
                  >
                    <FaEdit />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDeleteContent(item.id)}
                    className='text-red-500 hover:text-red-700 bg-red-100 px-2 py-1 rounded-md flex items-center space-x-1'
                  >
                    <FaTrash />
                    <span>Delete</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Content Modal */}
      {isModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl'>
            <h2 className='text-xl font-semibold mb-4 text-gray-800'>
              {currentContent.id ? 'Edit Content' : 'Add Content'}
            </h2>
            <div className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Title
                </label>
                <input
                  type='text'
                  name='title'
                  value={currentContent.title}
                  onChange={handleInputChange}
                  className='w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='Enter title'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Type
                </label>
                <select
                  name='type'
                  value={currentContent.type}
                  onChange={handleInputChange}
                  className='w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                >
                  <option value=''>Select Type</option>
                  <option value='Blog'>Blog</option>
                  <option value='FAQ'>FAQ</option>
                  <option value='Newsletter'>Newsletter</option>
                </select>
              </div>

              {/* Blog/Newsletter Fields */}
              {(currentContent.type === 'Blog' ||
                currentContent.type === 'Newsletter') && (
                <>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Content Body
                    </label>
                    <div className='bg-white border rounded-md p-2'>
                      <EditorContent editor={editor} />
                    </div>
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Image
                    </label>
                    <input
                      type='file'
                      accept='image/*'
                      onChange={handleImageUpload}
                      className='w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                    {currentContent.image && (
                      <img
                        src={currentContent.image}
                        alt='Preview'
                        className='w-24 h-24 object-cover rounded-md mt-2'
                      />
                    )}
                  </div>
                </>
              )}

              {/* FAQ Fields */}
              {currentContent.type === 'FAQ' && (
                <>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Question
                    </label>
                    <input
                      type='text'
                      name='question'
                      value={currentContent.question}
                      onChange={handleInputChange}
                      className='w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                      placeholder='Enter question'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Answer
                    </label>
                    <textarea
                      name='answer'
                      value={currentContent.answer}
                      onChange={handleInputChange}
                      className='w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                      placeholder='Enter answer'
                    />
                  </div>
                </>
              )}

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Status
                </label>
                <select
                  name='status'
                  value={currentContent.status}
                  onChange={handleInputChange}
                  className='w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                >
                  <option value='Draft'>Draft</option>
                  <option value='Published'>Published</option>
                </select>
              </div>
              <div className='flex justify-end space-x-4'>
                <button
                  onClick={closeModal}
                  className='bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors'
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveContent}
                  className='bg-defaul-button-colors text-white px-4 py-2 rounded-md hover:bg-red-500 transition-colors'
                >
                  {currentContent.id ? 'Save Changes' : 'Add Content'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminContentPage
