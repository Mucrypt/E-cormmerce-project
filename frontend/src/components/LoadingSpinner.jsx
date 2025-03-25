// src/components/common/LoadingSpinner.jsx
import PropTypes from 'prop-types';

const LoadingSpinner = ({ message = 'Loading...' }) => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-white'>
      <div className='animate-spin h-16 w-16 border-4 border-defaul-button border-t-transparent rounded-full mb-4'></div>
      <p className='text-lg font-medium text-gray-800 animate-pulse'>
        {message}
      </p>
    </div>
  )
}

LoadingSpinner.propTypes = {
  message: PropTypes.string,
};


export default LoadingSpinner
