import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaGoogle, FaFacebook, FaApple } from 'react-icons/fa' // Social icons
import { motion } from 'framer-motion' // For animations
import { loginUser } from '../redux/slices/authSlice'
import { useDispatch } from 'react-redux'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false) // Toggle password visibility
  const [error, setError] = useState('') // Error handling

  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    // Add your login logic here
    if (!email || !password) {
      setError('Please fill in all fields.')
    } else {
      setError('')
    dispatch(loginUser({ email, password }))
    }
  }

  return (
    <div className='min-h-screen flex flex-col md:flex-row bg-gradient-to-r from-green-50 to-green-100 mt-10'>
      {/** Left Side: Login Form */}
      <div className='w-full md:w-1/2 flex flex-col justify-center items-center p-6 md:p-12'>
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit}
          className='w-full max-w-md bg-white p-6 md:p-8 rounded-2xl border shadow-xl'
        >
          <div className='flex justify-center mb-6'>
            <h2 className='text-2xl font-extrabold text-defaul-button'>MUKULAH</h2>
          </div>
          <h2 className='text-2xl md:text-3xl font-bold text-center mb-6'>
            Hey there!
          </h2>
          <p className='text-center text-gray-600 mb-6 md:mb-8'>
            Enter your email and password to login
          </p>

          {/** Email Input */}
          <div className='mb-6'>
            <label htmlFor='email' className='block text-sm font-medium mb-2'>
              Email
            </label>
            <input
              type='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full p-2 md:p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all'
              placeholder='Enter your email'
              required
            />
          </div>

          {/** Password Input */}
          <div className='mb-6'>
            <label
              htmlFor='password'
              className='block text-sm font-medium mb-2'
            >
              Password
            </label>
            <div className='relative'>
              <input
                type={showPassword ? 'text' : 'password'}
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-full p-2 md:p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all'
                placeholder='Enter your password'
                required
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-3 top-2 md:top-3 text-gray-500 hover:text-green-700'
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          {/** Error Message */}
          {error && (
            <div className='mb-6 text-red-500 text-sm text-center'>{error}</div>
          )}

          {/** Sign In Button */}
          <div className='mb-6'>
            <button
              type='submit'
              className='w-full p-2 md:p-3 bg-defaul-button hover:bg-hero-button-hover transition-all text-white rounded-lg font-semibold shadow-lg hover:shadow-xl'
            >
              Sign In
            </button>
          </div>

          {/** Social Login Options */}
          <div className='mb-6'>
            <p className='text-center text-gray-600 mb-4'>Or sign in with:</p>
            <div className='flex justify-center space-x-4'>
              <button
                type='button'
                className='p-2 md:p-3 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all'
              >
                <FaGoogle className='text-lg md:text-xl' />
              </button>
              <button
                type='button'
                className='p-2 md:p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all'
              >
                <FaFacebook className='text-lg md:text-xl' />
              </button>
              <button
                type='button'
                className='p-2 md:p-3 bg-black hover:bg-gray-900 text-white rounded-full shadow-lg hover:shadow-xl transition-all'
              >
                <FaApple className='text-lg md:text-xl' />
              </button>
            </div>
          </div>

          {/** Register Link */}
          <p className='text-center text-gray-600'>
            Don&apos;t have an account?{' '}
            <Link
              to='/register'
              className='text-defaul-button hover:text-hero-button-hover font-semibold'
            >
              Register
            </Link>
          </p>
        </motion.form>
      </div>

      {/** Right Side: Hero Image (Hidden on Small Screens) */}
      <div className='hidden md:block w-1/2 bg-gradient-to-r from-green-50 to-defaul-button'>
        <div className='h-full flex flex-col justify-center items-center p-8 md:p-12'>
          <motion.img
            src='https://picsum.photos/id/204/800'
            alt='Login'
            className='w-full h-auto rounded-2xl shadow-2xl'
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
          <motion.h2
            className='text-3xl md:text-4xl font-bold text-white mt-6 md:mt-8 text-center'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Welcome Back!
          </motion.h2>
          <motion.p
            className='text-base md:text-lg text-white mt-2 md:mt-4 text-center'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            Discover the best products and services tailored just for you.
          </motion.p>
        </div>
      </div>
    </div>
  )
}

export default Login
