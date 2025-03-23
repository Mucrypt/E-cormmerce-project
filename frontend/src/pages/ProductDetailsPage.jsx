import { useState, useEffect } from 'react'
import {
  FaStar,
  FaChevronDown,
  FaChevronUp,
  FaHeart,
  FaTruck,
  FaShieldAlt,
  FaLock,
  FaCheckCircle,
  FaShoppingCart,
  FaBox,
  FaCreditCard,
  FaInfoCircle,
} from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const ProductDetailsPage = () => {
  const { id } = useParams() // Get product ID from URL
  const [product, setProduct] = useState(null)
  const [activeImage, setActiveImage] = useState('')
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [expandedSections, setExpandedSections] = useState({
    shipping: false,
    seller: false,
    returns: false,
    reviews: false,
    productInfo: false,
    security: false,
  })
  const [isWishlisted, setIsWishlisted] = useState(false)

  // Fetch product data based on ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`
        )
        setProduct(response.data)
        setActiveImage(response.data.images[0]?.url || '')
      } catch (error) {
        console.error('Error fetching product details:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  const handleMouseEnterProduct = (imgURL) => {
    setActiveImage(imgURL)
  }

  const handleBuyProduct = (e, productId) => {
    e.preventDefault()
    alert(`Buy product with ID: ${productId}`)
  }

  const handleAddToCart = (e, productId) => {
    e.preventDefault()
    alert(`Add to cart product with ID: ${productId}`)
  }

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const toggleWishlist = () => {
    setIsWishlisted((prev) => !prev)
    alert(`Product ${isWishlisted ? 'removed from' : 'added to'} wishlist.`)
  }

  if (loading) {
    return <div className='text-center py-8'>Loading product details...</div>
  }

  if (!product) {
    return <div className='text-center py-8'>Product not found.</div>
  }

  return (
    <div className='container mx-auto p-4 md:p-8'>
      <div className='min-h-[200px] flex flex-col lg:flex-row gap-8'>
        {/*** Product Image Section ***/}
        <div className='w-full lg:w-1/2 flex flex-col lg:flex-row-reverse gap-4'>
          <div className='w-full lg:w-[500px] h-[500px] bg-gray-100 relative p-2 shadow-lg rounded-lg'>
            <img
              src={activeImage}
              alt='Product'
              className='w-full h-full object-contain transition-transform duration-300 hover:scale-105'
            />
          </div>

          <div className='w-full lg:w-24 flex lg:flex-col gap-2 overflow-scroll scrollbar-none'>
            {product.images && product.images.length > 0 ? (
              product.images.map((image, index) => (
                <div
                  className='w-20 h-20 lg:w-24 lg:h-24 bg-gray-100 rounded-lg p-1 cursor-pointer hover:shadow-md transition-shadow'
                  key={index}
                  onClick={() => handleMouseEnterProduct(image.url)}
                >
                  <img
                    src={image.url}
                    alt={`Thumbnail ${index + 1}`}
                    className='w-full h-full object-contain'
                  />
                </div>
              ))
            ) : (
              <p>No images available.</p>
            )}
          </div>
        </div>

        {/*** Product Details Section ***/}
        <div className='w-full lg:w-1/2 flex flex-col gap-4'>
          <h1 className='text-3xl font-bold'>{product.name}</h1>
          <div className='flex items-center gap-2'>
            <div className='text-yellow-400 flex items-center gap-1'>
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={
                    i < Math.floor(product.rating)
                      ? 'fill-current'
                      : product.rating % 1 !== 0 &&
                        i === Math.floor(product.rating)
                      ? 'fill-current-half'
                      : 'fill-gray-300'
                  }
                />
              ))}
            </div>
            <span className='text-sm text-gray-600 underline'>
              ({product.numReviews} reviews)
            </span>
          </div>
          <div className='flex items-center gap-4'>
            <p className='text-2xl font-bold text-red-600'>
              ${product.discountPrice.toFixed(2)}
            </p>
            <p className='text-lg text-gray-500 line-through'>
              ${product.price.toFixed(2)}
            </p>
            <p className='text-sm text-green-600'>7% off</p>
          </div>

          {/*** FREE Delivery and Returns ***/}
          <div className='bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border border-green-100'>
            <p className='text-green-600 font-semibold'>
              <FaTruck className='inline-block mr-2' />
              FREE delivery Thursday, March 20 on your first order.
            </p>
            <p className='text-gray-600 mt-2'>
              Or faster delivery tomorrow, March 17. Order within 58 minutes.
            </p>
            <p className='text-gray-600 mt-2'>
              Delivery to Rome 00182:{' '}
              <span className='text-blue-600 cursor-pointer hover:underline'>
                Update location
              </span>
            </p>
          </div>

          {/*** Brand and Colors ***/}
          <div className='mt-4'>
            <p className='text-lg font-semibold'>
              <FaInfoCircle className='inline-block mr-2' />
              Brand: <span className='text-gray-700'>{product.brand}</span>
            </p>
            <div className='mt-2'>
              <p className='text-lg font-semibold'>Colors:</p>
              <div className='flex gap-2 mt-2'>
                {product.colors.map((color, index) => (
                  <div
                    key={index}
                    className='w-8 h-8 rounded-full border-2 border-gray-200 cursor-pointer hover:shadow-lg'
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/*** Stock Availability ***/}
          <div className='mt-4'>
            <p className='text-lg font-semibold'>
              <FaBox className='inline-block mr-2' />
              Availability: <span className='text-green-600'>In Stock</span>
            </p>
            <div className='w-full bg-gray-200 rounded-full h-2 mt-2'>
              <div
                className='bg-green-600 h-2 rounded-full'
                style={{ width: `${(product.stock / 100) * 100}%` }}
              />
            </div>
            <p className='text-sm text-gray-600 mt-2'>
              {product.stock} items left
            </p>
          </div>

          {/*** Quantity Selector and Wishlist ***/}
          <div className='mt-4 flex items-center gap-4'>
            <div>
              <label className='text-lg font-semibold'>Quantity:</label>
              <select
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className='ml-2 p-2 border rounded-lg'
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>
            <button
              className='p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors'
              onClick={toggleWishlist}
              aria-label={
                isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'
              }
            >
              <FaHeart
                className={`text-xl ${
                  isWishlisted ? 'text-red-600 animate-pulse' : 'text-gray-600'
                }`}
              />
            </button>
          </div>

          {/*** Buttons ***/}
          <div className='flex items-center gap-4 mt-4'>
            <button
              className='px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition-colors w-full flex items-center justify-center gap-2'
              onClick={(e) => handleAddToCart(e, product._id)}
            >
              <FaShoppingCart />
              Add to Cart
            </button>
            <button
              className='px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors w-full flex items-center justify-center gap-2'
              onClick={(e) => handleBuyProduct(e, product._id)}
            >
              <FaCreditCard />
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/*** Product Information Section ***/}
      <div className='mt-8'>
        <h2 className='text-2xl font-bold'>Information on this article</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-4'>
          <div>
            <h3 className='text-xl font-semibold mb-2'>Description</h3>
            <p className='text-gray-700'>{product.description}</p>
          </div>
          <div>
            <h3 className='text-xl font-semibold mb-2'>Material & Care</h3>
            <p className='text-gray-700'>
              <strong>Material:</strong> {product.material || 'N/A'}
              <br />
              <strong>Care Instructions:</strong>{' '}
              {product.careInstructions || 'N/A'}
            </p>
          </div>
        </div>
      </div>

      {/*** Reviews Section ***/}
      <div className='mt-8'>
        <h2 className='text-2xl font-bold mb-4'>Customer Reviews</h2>
        <div
          className='flex justify-between items-center cursor-pointer'
          onClick={() => toggleSection('reviews')}
        >
          <h3 className='text-lg font-semibold'>
            {product.numReviews} Reviews
          </h3>
          {expandedSections.reviews ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {expandedSections.reviews && (
          <div className='mt-4'>
            {product.reviews.map((review, index) => (
              <div key={index} className='mb-6 border-b pb-4'>
                <div className='flex items-center gap-2'>
                  <div className='text-yellow-400 flex items-center gap-1'>
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={
                          i < review.rating ? 'fill-current' : 'fill-gray-300'
                        }
                      />
                    ))}
                  </div>
                  <span className='text-sm text-gray-600'>
                    by {review.name}
                  </span>
                </div>
                <p className='text-gray-700 mt-2'>{review.comment}</p>
                <div className='flex gap-4 mt-2'>
                  <button className='text-blue-600 hover:underline'>
                    Helpful
                  </button>
                  <button className='text-gray-600 hover:underline'>
                    Not Helpful
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/*** Recommended Products Section ***/}
      <div className='mt-12'>
        <h2 className='text-2xl font-bold mb-4'>Recommended Products</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className='bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow'
            >
              <img
                src={`https://picsum.photos/id/${item + 10}/500`}
                alt={`Product ${item}`}
                className='w-full h-48 object-cover rounded-lg'
              />
              <h3 className='text-lg font-medium mt-2'>Product {item}</h3>
              <p className='text-gray-600'>$99.99</p>
            </div>
          ))}
        </div>
      </div>

      {/*** Additional Information Section (Below Product Image) ***/}
      <div className='mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {/*** Free Shipping ***/}
        <div className='bg-gray-50 p-4 rounded-lg border border-gray-200'>
          <div className='flex items-center gap-2'>
            <FaTruck className='text-green-600' />
            <p className='text-green-600 font-semibold'>
              Free Shipping (Orders ≥ $20.65)
            </p>
          </div>
        </div>

        {/*** Click & Collect Delivery ***/}
        <div className='bg-gray-50 p-4 rounded-lg border border-gray-200'>
          <div className='flex items-center gap-2'>
            <FaCheckCircle className='text-blue-600' />
            <p className='text-blue-600 font-semibold'>
              Click & Collect Delivery: 5-9 Working Days
            </p>
          </div>
        </div>

        {/*** Return Policy ***/}
        <div className='bg-gray-50 p-4 rounded-lg border border-gray-200'>
          <div className='flex items-center gap-2'>
            <FaShieldAlt className='text-red-600' />
            <p className='text-red-600 font-semibold'>
              Return Policy: Returns and exchanges of items are not supported.
            </p>
          </div>
        </div>

        {/*** Security in Purchasing ***/}
        <div className='bg-gray-50 p-4 rounded-lg border border-gray-200'>
          <div className='flex items-center gap-2'>
            <FaLock className='text-purple-600' />
            <p className='text-purple-600 font-semibold'>
              Security in Purchasing:
            </p>
          </div>
          <div className='mt-2'>
            <div className='flex items-center gap-2'>
              <FaCheckCircle className='text-green-600' />
              <p className='text-gray-700'>Secure payments</p>
            </div>
            <div className='flex items-center gap-2 mt-2'>
              <FaCheckCircle className='text-green-600' />
              <p className='text-gray-700'>Safe logistics</p>
            </div>
            <div className='flex items-center gap-2 mt-2'>
              <FaCheckCircle className='text-green-600' />
              <p className='text-gray-700'>Customer Service</p>
            </div>
            <div className='flex items-center gap-2 mt-2'>
              <FaCheckCircle className='text-green-600' />
              <p className='text-gray-700'>Privacy Protection</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailsPage
