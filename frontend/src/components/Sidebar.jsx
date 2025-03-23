import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const Sidebar = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className='w-64 bg-white shadow-lg h-screen fixed left-0 top-0 overflow-y-auto'>
      <div className='p-6'>
        <h2 className='text-xl font-bold mb-6'>Categories</h2>
        <nav className='space-y-2'>
          {categories.map((category) => (
            <Link
              key={category._id}
              to={`/category/${category._id}`}
              className={`block p-2 rounded-lg ${
                selectedCategory === category._id
                  ? 'bg-green-100 text-green-900'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => onSelectCategory(category._id)}
            >
              {category.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}
Sidebar.propTypes = {
  categories: PropTypes.array.isRequired,
  selectedCategory: PropTypes.string.isRequired,
  onSelectCategory: PropTypes.func.isRequired,
}


export default Sidebar
