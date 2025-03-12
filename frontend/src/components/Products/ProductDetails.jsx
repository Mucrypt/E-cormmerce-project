import { useState, useEffect } from 'react'
import { FaStar, FaStarHalf } from 'react-icons/fa'
import { useParams } from 'react-router-dom' // Import useParams

const ProductDetails = () => {
  const { id } = useParams() // Get product ID from URL
  const [product, setProduct] = useState(null)
  const [activeImage, setActiveImage] = useState('')
  const [zoomImage, setZoomImage] = useState(false)
  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({ x: 0, y: 0 })

  // Fetch product data based on ID
  useEffect(() => {
    const fetchProduct = async () => {
      // Simulate fetching product data from an API
      const fetchedProduct = {
        _id: id,
        productImage: [
          'https://picsum.photos/id/1/500',
          'https://picsum.photos/id/2/500',
          'https://picsum.photos/id/3/500',
          'https://picsum.photos/id/4/500',
        ],
        brandName: 'Brand Name',
        productName: 'Stylish Jacket',
        category: "Men's Clothing",
        price: 149.99,
        description:
          'This stylish jacket is perfect for any occasion. Made with high-quality materials, it offers both comfort and durability.',
      }
      setProduct(fetchedProduct)
      setActiveImage(fetchedProduct.productImage[0]) // Set default active image
    }

    fetchProduct()
  }, [id])

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
    alert(`Buy product with ID: ${productId}`)
  }

  const handleAddToCart = (e, productId) => {
    e.preventDefault()
    alert(`Add to cart product with ID: ${productId}`)
  }

  if (!product) {
    return <div>Loading...</div> // Show loading state while fetching data
  }

  return (
    <div className='container mx-auto p-8'>
      <div className='min-h-[200px] flex flex-col lg:flex-row gap-4'>
        {/*** Product Image Section ***/}
        <div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>
          <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-[var(--color-background)] relative p-2 shadow customShadow'>
            <img
              src={activeImage}
              alt='Product'
              className='h-full w-full object-scale-down mix-blend-multiply'
              onMouseMove={handleZoomImage}
              onMouseLeave={handleLeaveImageZoom}
            />

            {zoomImage && (
              <div className='hidden lg:block absolute min-w-[500px] overflow-hidden min-h-[400px] bg-[var(--color-background)] p-1 -right-[510px] top-0 shadow customShadow'>
                <div
                  className='w-full h-full min-h-[400px] min-w-[500px] mix-blend-multiply scale-150'
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
          </div>

          <div className='h-full'>
            <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
              {product.productImage.map((imgURL, index) => (
                <div
                  className='h-20 w-20 bg-[var(--color-border)] rounded p-1'
                  key={index}
                >
                  <img
                    src={imgURL}
                    alt={`Thumbnail ${index + 1}`}
                    className='w-full h-full object-scale-down mix-blend-multiply cursor-pointer'
                    onMouseEnter={() => handleMouseEnterProduct(imgURL)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/*** Product Details ***/}
        <div className='flex flex-col gap-1'>
          <p className='bg-[var(--color-primary)] text-[var(--color-background)] px-2 rounded-full inline-block w-fit'>
            {product.brandName}
          </p>
          <h2 className='text-2xl lg:text-4xl font-medium'>
            {product.productName}
          </h2>
          <p className='capitalize text-[var(--color-text)]'>
            {product.category}
          </p>
          <div className='text-yellow-400 flex items-center gap-1'>
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStarHalf />
          </div>
          <div className='flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1'>
            <p className='text-[var(--color-primary)]'>
              ${product.price.toFixed(2)}
            </p>
            <p className='text-[var(--color-text)] line-through'>
              ${(product.price + 50).toFixed(2)}
            </p>
          </div>
          <div className='flex items-center gap-3 my-2'>
            <button
              className='border-2 border-[var(--color-primary)] rounded px-3 py-1 min-w-[120px] font-medium text-[var(--color-background)] bg-[var(--color-primary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-background)]'
              onClick={(e) => handleBuyProduct(e, product._id)}
            >
              Buy
            </button>
            <button
              className='border-2 border-[var(--color-primary)] rounded px-3 py-1 min-w-[120px] font-medium text-[var(--color-background)] bg-[var(--color-primary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-background)]'
              onClick={(e) => handleAddToCart(e, product._id)}
            >
              Add To Cart
            </button>
          </div>
          <div>
            <p className='text-[var(--color-text)] font-medium my-1'>
              Description:
            </p>
            <p>{product.description}</p>
          </div>
        </div>
      </div>

      {/*** Recommended Products Section ***/}
      {product.category && (
        <div className='mt-12'>
          <h2 className='text-2xl font-bold mb-4'>Recommended Products</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className='bg-[var(--color-background)] p-4 rounded-lg shadow customShadow'
              >
                <img
                  src={`https://picsum.photos/id/${item + 10}/500`}
                  alt={`Product ${item}`}
                  className='w-full h-48 object-cover mix-blend-multiply'
                />
                <h3 className='text-lg font-medium mt-2'>Product {item}</h3>
                <p className='text-[var(--color-text)]'>$99.99</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductDetails
