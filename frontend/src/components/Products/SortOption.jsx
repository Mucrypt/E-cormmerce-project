import PropTypes from 'prop-types'

const SortOption = ({ sortBy, setSortBy }) => {
  return (
    <div className='flex items-center space-x-4'>
      <span className='text-md font-semibold text-gray-800'>Sort By:</span>
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className='p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all'
      >
        <option value=''>Default</option>
        <option value='price_asc'>Price: Low to High</option>
        <option value='price_desc'>Price: High to Low</option>
        <option value='newest'>Newest Arrivals</option>
        <option value='popularity'>Popularity</option>
      </select>
    </div>
  )
}

SortOption.propTypes = {
  sortBy: PropTypes.string.isRequired, // Validate `sortBy` as a required string
  setSortBy: PropTypes.func.isRequired, // Validate `setSortBy` as a required function
}

export default SortOption
