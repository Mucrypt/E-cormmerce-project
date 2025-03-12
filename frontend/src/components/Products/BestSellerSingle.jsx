import { useState } from 'react'
import { FaStar, FaStarHalf } from 'react-icons/fa'
import { toast } from 'sonner'

const BestSellerSingle = () => {
  // Placeholder data for the best-selling product
  const bestSellerProduct = {
    _id: '1',
    productImage: [
      'https://picsum.photos/id/1/800',
      'https://picsum.photos/id/2/800',
      'https://picsum.photos/id/3/800',
      'https://picsum.photos/id/4/800',
    ],
    brandName: 'Luxury Brand',
    productName: 'Elegant Leather Jacket',
    category: "Men's Clothing",
    price: 299.99,
    description:
      'Crafted with premium leather, this elegant jacket combines timeless style with unmatched comfort. Perfect for any occasion, it’s a must-have in your wardrobe.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    materials: ['Genuine Leather', 'Cotton Lining'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Brown', hex: '#964B00' },
      { name: 'Navy Blue', hex: '#000080' },
    ],
  }

  const [activeImage, setActiveImage] = useState(
    bestSellerProduct.productImage[0]
  )
  const [zoomImage, setZoomImage] = useState(false)
  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({ x: 0, y: 0 })
  const [selectedSize, setSelectedSize] = useState(null)
  const [selectedColor, setSelectedColor] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)

  const handleZoomImage = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect()
    const x = ((e.pageX - left) / width).toFixed(2)
    const y = ((e.pageY - top) / height).toFixed(2)
    setZoomImageCoordinate({ x, y })
    setZoomImage(true)
  }

  const handleLeaveImageZoom = () => {
    setZoomImage(false)
  }

  const handleMouseEnterProduct = (imgURL) => {
    setActiveImage(imgURL)
  }

  const handleBuyProduct = (e, productId) => {
    e.preventDefault()
    alert(`Buy product with ID: ${productId}, Quantity: ${quantity}`)
  }

  const handleAddToCart = (e) => {
    e.preventDefault()

    // Validate size and color selection
    if (!selectedSize || !selectedColor) {
      toast.error('Please select size and color before adding to cart.', {
        duration: 1000,
      })
      return // Exit early if size or color is not selected
    }

    // Disable the button to prevent multiple clicks
    setIsButtonDisabled(true)

    // Simulate adding to cart with a delay
    setTimeout(() => {
      toast.success('Product added to cart.', {
        duration: 500,
      })
      setIsButtonDisabled(false) // Re-enable the button after the operation
    }, 1000)
  }

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1)
  }

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  return (
    <section className='py-16 bg-gradient-to-b from-gray-50 to-white'>
      <div className='container mx-auto px-4'>
        <div className='flex flex-col lg:flex-row gap-8 items-start'>
          {/*** Product Image Section ***/}
          <div className='w-full lg:w-1/2 flex flex-col lg:flex-row-reverse gap-6'>
            {/*** Main Image ***/}
            <div className='relative group h-[500px] w-full lg:w-[500px] bg-white rounded-xl shadow-2xl overflow-hidden'>
              <img
                src={activeImage}
                alt={bestSellerProduct.productName}
                className='w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105'
                onMouseMove={handleZoomImage}
                onMouseLeave={handleLeaveImageZoom}
              />
              {zoomImage && (
                <div className='hidden lg:block absolute min-w-[600px] overflow-hidden min-h-[500px] bg-white p-2 -right-[620px] top-0 shadow-2xl rounded-xl'>
                  <div
                    className='w-full h-full min-h-[500px] min-w-[600px] mix-blend-multiply scale-150'
                    style={{
                      background: `url(${activeImage})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: `${zoomImageCoordinate.x * 100}% ${
                        zoomImageCoordinate.y * 100
                      }%`,
                    }}
                  />
                </div>
              )}
              <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300' />
            </div>

            {/*** Thumbnail Gallery ***/}
            <div className='h-full'>
              <div className='flex gap-3 lg:flex-col overflow-scroll scrollbar-none h-full'>
                {bestSellerProduct.productImage.map((imgURL, index) => (
                  <div
                    className='h-24 w-24 bg-gray-100 rounded-lg p-1.5 cursor-pointer hover:shadow-lg transition-shadow duration-300'
                    key={index}
                  >
                    <img
                      src={imgURL}
                      alt={`Thumbnail ${index + 1}`}
                      className='w-full h-full object-cover rounded-md mix-blend-multiply'
                      onMouseEnter={() => handleMouseEnterProduct(imgURL)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/*** Product Details ***/}
          <div className='w-full lg:w-1/2'>
            <p className='bg-[var(--color-primary)] text-white px-4 py-2 rounded-full inline-block text-sm font-medium'>
              {bestSellerProduct.brandName}
            </p>
            <h2 className='text-4xl lg:text-5xl font-bold mt-6 text-gray-900'>
              {bestSellerProduct.productName}
            </h2>
            <p className='text-gray-600 mt-3 text-lg'>
              {bestSellerProduct.category}
            </p>
            <div className='flex items-center mt-4'>
              <div className='text-yellow-400 flex items-center gap-1'>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStarHalf />
              </div>
              <span className='text-sm text-gray-500 ml-2'>(4.8)</span>
            </div>
            <div className='flex items-center gap-4 mt-6'>
              <p className='text-3xl font-bold text-[var(--color-primary)]'>
                ${bestSellerProduct.price.toFixed(2)}
              </p>
              <p className='text-gray-400 line-through text-xl'>
                ${(bestSellerProduct.price + 100).toFixed(2)}
              </p>
            </div>
            <p className='text-gray-700 mt-6 text-lg leading-relaxed'>
              {bestSellerProduct.description}
            </p>

            {/*** Sizes ***/}
            <div className='mt-6'>
              <h3 className='text-xl font-semibold text-gray-900'>Size</h3>
              <div className='flex gap-3 mt-2'>
                {bestSellerProduct.sizes.map((size) => (
                  <button
                    key={size}
                    className={`px-4 py-2 rounded-lg border ${
                      selectedSize === size
                        ? 'bg-hero-button-hover text-white border-[var(--color-primary)]'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                    } transition-colors`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/*** Colors ***/}
            <div className='mt-6'>
              <h3 className='text-xl font-semibold text-gray-900'>Color</h3>
              <div className='flex gap-3 mt-2'>
                {bestSellerProduct.colors.map((color) => (
                  <button
                    key={color.name}
                    className={`w-10 h-10 rounded-full border-2 ${
                      selectedColor === color.name
                        ? 'border-[var(--color-primary)]'
                        : 'border-gray-300'
                    } transition-colors`}
                    style={{ backgroundColor: color.hex }}
                    onClick={() => setSelectedColor(color.name)}
                  />
                ))}
              </div>
            </div>

            {/*** Materials ***/}
            <div className='mt-6'>
              <h3 className='text-xl font-semibold text-gray-900'>Material</h3>
              <ul className='mt-2 text-gray-700'>
                {bestSellerProduct.materials.map((material, index) => (
                  <li key={index} className='list-disc ml-5'>
                    {material}
                  </li>
                ))}
              </ul>
            </div>

            {/*** Quantity Selector ***/}
            <div className='mt-6'>
              <h3 className='text-xl font-semibold text-gray-900'>Quantity:</h3>
              <div className='flex items-center gap-3 mt-2'>
                <button
                  className='w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors'
                  onClick={handleDecrement}
                >
                  -
                </button>
                <input
                  type='number'
                  value={quantity}
                  readOnly
                  className='w-16 h-10 text-center border border-gray-300 rounded-lg'
                />
                <button
                  className='w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors'
                  onClick={handleIncrement}
                >
                  +
                </button>
              </div>
            </div>

            {/*** Buttons ***/}
            <div className='flex gap-6 mt-8'>
              <button
                className='flex-1 bg-defaul-button text-white py-4 rounded-xl text-lg font-semibold hover:bg-hero-button-hover transition-colors shadow-lg hover:shadow-xl'
                onClick={(e) => handleBuyProduct(e, bestSellerProduct._id)}
              >
                Buy Now
              </button>
              <button
                className={`flex-1 border-2 border-[var(--color-primary)] text-[var(--color-primary)] py-4 rounded-xl text-lg font-semibold hover:bg-[var(--color-primary)] hover:text-hero-button-hover transition-colors shadow-lg hover:shadow-xl 
                  ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={handleAddToCart}
                disabled={isButtonDisabled}
              >
                {isButtonDisabled ? 'Adding to Cart.....' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BestSellerSingle
