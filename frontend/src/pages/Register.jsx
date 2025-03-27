import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { FaGoogle, FaFacebook, FaApple } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { registerUser, loginUser } from '../redux/slices/authSlice'
import { useDispatch, useSelector } from 'react-redux'

const Register = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [localError, setLocalError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Router hooks
  const navigate = useNavigate()
  const location = useLocation()
  const redirect = new URLSearchParams(location.search).get('redirect') || '/'

  // Redux state
  const dispatch = useDispatch()
  const { user, error: authError } = useSelector((state) => state.auth)

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLocalError('')
    setIsSubmitting(true)

    // Client-side validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setLocalError('Please fill in all fields')
      setIsSubmitting(false)
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setLocalError('Passwords do not match')
      setIsSubmitting(false)
      return
    }

    if (formData.password.length < 6) {
      setLocalError('Password must be at least 6 characters')
      setIsSubmitting(false)
      return
    }

    try {
      // Register the user
      const registerResult = await dispatch(
        registerUser({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        })
      )

      if (registerUser.rejected.match(registerResult)) {
        // Registration failed
        setIsSubmitting(false)
        return
      }

      // If registration successful, automatically log in
      const loginResult = await dispatch(
        loginUser({
          email: formData.email,
          password: formData.password,
        })
      )

      if (loginUser.rejected.match(loginResult)) {
        setLocalError(
          'Registered successfully but failed to log in automatically'
        )
        setIsSubmitting(false)
      }
    } catch (err) {
      console.error('Registration error:', err)
      setLocalError('An unexpected error occurred')
      setIsSubmitting(false)
    }
  }

  // Redirect after successful login
  useEffect(() => {
    if (user) {
      navigate(redirect)
    }
  }, [user, navigate, redirect])

  // Display backend errors
  useEffect(() => {
    if (authError) {
      setLocalError(authError.message || authError)
    }
  }, [authError])

  return (
    <div className='min-h-screen flex flex-col md:flex-row bg-gradient-to-r from-green-50 to-green-100 mt-6'>
      {/* Left Side: Registration Form */}
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
            <h2 className='text-2xl font-extrabold text-top-red'>MUKULAH</h2>
          </div>
          <h2 className='text-2xl md:text-3xl font-bold text-center mb-6'>
            Create Your Account
          </h2>
          <p className='text-center text-gray-600 mb-6 md:mb-8'>
            Join us to discover amazing products
          </p>

          {/* Name Input */}
          <div className='mb-4'>
            <label htmlFor='name' className='block text-sm font-medium mb-2'>
              Full Name
            </label>
            <input
              type='text'
              id='name'
              name='name'
              value={formData.name}
              onChange={handleChange}
              className='w-full p-2 md:p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all'
              placeholder='Enter your full name'
              required
              disabled={isSubmitting}
            />
          </div>

          {/* Email Input */}
          <div className='mb-4'>
            <label htmlFor='email' className='block text-sm font-medium mb-2'>
              Email Address
            </label>
            <input
              type='email'
              id='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              className='w-full p-2 md:p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all'
              placeholder='Enter your email'
              required
              disabled={isSubmitting}
            />
          </div>

          {/* Password Input */}
          <div className='mb-4'>
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
                name='password'
                value={formData.password}
                onChange={handleChange}
                className='w-full p-2 md:p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all'
                placeholder='Enter your password'
                required
                minLength={6}
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

          {/* Confirm Password Input */}
          <div className='mb-6'>
            <label
              htmlFor='confirmPassword'
              className='block text-sm font-medium mb-2'
            >
              Confirm Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id='confirmPassword'
              name='confirmPassword'
              value={formData.confirmPassword}
              onChange={handleChange}
              className='w-full p-2 md:p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all'
              placeholder='Confirm your password'
              required
              minLength={6}
              disabled={isSubmitting}
            />
          </div>

          {/* Error Message */}
          {localError && (
            <div className='mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm'>
              {localError}
            </div>
          )}

          {/* Sign Up Button */}
          <div className='mb-6'>
            <button
              type='submit'
              className={`w-full p-2 md:p-3 bg-defaul-button hover:bg-hero-button-hover transition-all text-white rounded-lg font-semibold shadow-lg hover:shadow-xl ${
                isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating Account...' : 'Sign Up'}
            </button>
          </div>

          {/* Social Login Options */}
          <div className='mb-6'>
            <p className='text-center text-gray-600 mb-4'>Or sign up with:</p>
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

          {/* Login Link */}
          <p className='text-center text-gray-600'>
            Already have an account?{' '}
            <Link
              to={`/login?redirect=${encodeURIComponent(redirect)}`}
              className='text-defaul-button hover:text-hero-button-hover font-semibold'
            >
              Log In
            </Link>
          </p>
        </motion.form>
      </div>

      {/* Right Side: Hero Image */}
      <div className='hidden md:block w-1/2 bg-gradient-to-r from-green-50 to-defaul-button'>
        <div className='h-full flex flex-col justify-center items-center p-8 md:p-12'>
          <motion.img
            src='https://picsum.photos/id/2/800'
            alt='Register'
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
            Welcome Aboard!
          </motion.h2>
          <motion.p
            className='text-base md:text-lg text-white mt-2 md:mt-4 text-center'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            Start your shopping journey with us today.
          </motion.p>
        </div>
      </div>
    </div>
  )
}

export default Register
