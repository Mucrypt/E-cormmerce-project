
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const FilterSidebar = ({ collections, onClose, onCollectionClick }) => {
  return (
    <div className='p-4'>
      <h2 className='text-xl font-semibold mb-4'>Collections</h2>
     
      <nav className='flex flex-col space-y-3'>
        {collections.map((collection) => (
          <Link
            key={collection._id}
            to={`/collections/${collection._id}`}
            className='text-gray-700 hover:text-black text-sm'
            onClick={() => {
              onCollectionClick(collection)
              onClose()
            }}
          >
            {collection.name}
          </Link>
        ))}
      </nav>
    </div>
  )
}
FilterSidebar.propTypes = {
  collections: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
  onCollectionClick: PropTypes.func.isRequired,
}


export default FilterSidebar
