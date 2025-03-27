import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaGoogle, FaFacebook, FaApple } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { loginUser } from '../redux/slices/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { mergeCart } from '../redux/slices/cartSlice'

const Login = () => {
  // Form state
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [localError, setLocalError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Router hooks
  const navigate = useNavigate()
  const location = useLocation()

  // Redux state
  const dispatch = useDispatch()
  const { user, guestId, error: authError } = useSelector((state) => state.auth)
  const { cart } = useSelector((state) => state.cart)

  // Redirect logic
  const redirect = new URLSearchParams(location.search).get('redirect') || '/'
  const isCheckoutRedirect = redirect.includes('/checkout')

  // Handle successful login and cart merge
  useEffect(() => {
    if (user) {
      const performPostLoginActions = async () => {
        try {
          // Only attempt merge if there are products in REDUX cart state AND we have a guestId
          if (cart?.products?.length > 0 && guestId) {
            console.log(
              'Attempting cart merge with guestId:',
              guestId,
              'and cart:',
              cart
            )

            // Verify the guest cart exists in the database
            try {
              const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
                { params: { guestId } }
              )

              if (response.data?.products?.length > 0) {
                const result = await dispatch(mergeCart({ guestId }))
                if (mergeCart.fulfilled.match(result)) {
                  console.log('Cart merge successful:', result.payload)
                }
              } else {
                console.log('No guest cart found in database, skipping merge')
              }
            } catch (err) {
              console.error('Error checking guest cart:', err)
            }
          }

          navigate(isCheckoutRedirect ? '/checkout' : '/')
        } catch (mergeError) {
          console.error('Post-login error:', mergeError)
          navigate(isCheckoutRedirect ? '/checkout' : '/')
        }
      }

      performPostLoginActions()
    }
  }, [user, cart, guestId, dispatch, navigate, isCheckoutRedirect])

  // Handle form submission
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLocalError('')
    setIsSubmitting(true)

    // Client-side validation
    if (!email || !password) {
      setLocalError('Please fill in all fields')
      setIsSubmitting(false)
      return
    }

    try {
      const result = await dispatch(loginUser({ email, password }))

      if (loginUser.rejected.match(result)) {
        const error = result.payload
        console.error('Login error:', error)

        // Handle specific error cases
        if (error.status === 400) {
          setLocalError(error.message || 'Invalid email or password')
        } else if (error.status === 401) {
          setLocalError('Authentication failed')
        } else if (error.status === 0) {
          setLocalError('Network error - please check your connection')
        } else {
          setLocalError(error.message || 'Login failed')
        }
      }
    } catch (err) {
      console.error('Unexpected error:', err)
      setLocalError('An unexpected error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }
  // Combine local and auth errors for display
  const displayError = localError || authError?.message

  return (
    <div className='min-h-screen flex flex-col md:flex-row bg-gradient-to-r from-green-50 to-green-100 mt-10'>
      {/* Left Side: Login Form */}
      <div className='w-full md:w-1/2 flex flex-col justify-center items-center p-6 md:p-12'>
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit}
          className='w-full max-w-md bg-white p-6 md:p-8 rounded-2xl border shadow-xl'
          noValidate
        >
          <div className='flex justify-center mb-6'>
            <h2 className='text-2xl font-extrabold text-defaul-button'>
              MUKULAH
            </h2>
          </div>
          <h2 className='text-2xl md:text-3xl font-bold text-center mb-6'>
            Hey there!
          </h2>
          <p className='text-center text-gray-600 mb-6 md:mb-8'>
            Enter your email and password to login
          </p>

          {/* Email Input */}
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
              disabled={isSubmitting}
            />
          </div>

          {/* Password Input */}
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
                disabled={isSubmitting}
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-3 top-2 md:top-3 text-gray-500 hover:text-green-700'
                disabled={isSubmitting}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {displayError && (
            <div className='mb-6 p-3 bg-red-50 text-red-600 rounded-lg text-sm'>
              {displayError}
              {authError?.errors && (
                <ul className='mt-1 pl-4 list-disc'>
                  {Object.entries(authError.errors).map(([field, message]) => (
                    <li key={field}>{message}</li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Sign In Button */}
          <div className='mb-6'>
            <button
              type='submit'
              className={`w-full p-2 md:p-3 bg-defaul-button hover:bg-hero-button-hover transition-all text-white rounded-lg font-semibold shadow-lg hover:shadow-xl ${
                isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Signing In...' : 'Sign In'}
            </button>
          </div>

          {/* Social Login Options */}
          <div className='mb-6'>
            <p className='text-center text-gray-600 mb-4'>Or sign in with:</p>
            <div className='flex justify-center space-x-4'>
              <button
                type='button'
                className='p-2 md:p-3 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all'
                disabled={isSubmitting}
              >
                <FaGoogle className='text-lg md:text-xl' />
              </button>
              <button
                type='button'
                className='p-2 md:p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all'
                disabled={isSubmitting}
              >
                <FaFacebook className='text-lg md:text-xl' />
              </button>
              <button
                type='button'
                className='p-2 md:p-3 bg-black hover:bg-gray-900 text-white rounded-full shadow-lg hover:shadow-xl transition-all'
                disabled={isSubmitting}
              >
                <FaApple className='text-lg md:text-xl' />
              </button>
            </div>
          </div>

          {/* Register Link */}
          <p className='text-center text-gray-600'>
            Don&apos;t have an account?{' '}
            <Link
              to={`/register?redirect=${encodeURIComponent(redirect)}`}
              className='text-defaul-button hover:text-hero-button-hover font-semibold'
            >
              Register
            </Link>
          </p>
        </motion.form>
      </div>

      {/* Right Side: Hero Image */}
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
