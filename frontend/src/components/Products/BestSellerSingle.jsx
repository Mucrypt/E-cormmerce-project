import { useState, useEffect } from 'react';
import { FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBestSellers } from '../../redux/slices/productsSlice';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const BestSellerSingle = () => {
  const dispatch = useDispatch();
  const { bestSellers = [], loading, error } = useSelector((state) => state.products);

  // Fetch best-selling products on component mount
  useEffect(() => {
    dispatch(fetchBestSellers());
  }, [dispatch]);

  // Use the first best-selling product (or fallback to an empty object if no products are available)
  const bestSellerProduct = bestSellers[0] || {
    _id: '',
    name: '',
    price: 0,
    discountPrice: 0,
    images: [],
    rating: 0,
    numReviews: 0,
    description: '',
    sizes: [], // Default empty array for sizes
    colors: [], // Default empty array for colors
    materials: [], // Default empty array for materials
    category: 'Category', // Default category name
    brand: 'Brand', // Default brand name
  };

  const [activeImage, setActiveImage] = useState(
    bestSellerProduct.images[0]?.url || null
  );
  const [zoomImage, setZoomImage] = useState(false);
  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({ x: 0, y: 0 });
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleZoomImage = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left) / width).toFixed(2);
    const y = ((e.pageY - top) / height).toFixed(2);
    setZoomImageCoordinate({ x, y });
    setZoomImage(true);
  };

  const handleLeaveImageZoom = () => {
    setZoomImage(false);
  };

  const handleMouseEnterProduct = (imgURL, index) => {
    setActiveImage(imgURL);
    setCurrentImageIndex(index);
  };

  const handleNextImage = () => {
    const nextIndex = (currentImageIndex + 1) % bestSellerProduct.images.length;
    setCurrentImageIndex(nextIndex);
    setActiveImage(bestSellerProduct.images[nextIndex].url);
  };

  const handlePrevImage = () => {
    const prevIndex =
      (currentImageIndex - 1 + bestSellerProduct.images.length) % bestSellerProduct.images.length;
    setCurrentImageIndex(prevIndex);
    setActiveImage(bestSellerProduct.images[prevIndex].url);
  };

  const handleBuyProduct = (e, productId) => {
    e.preventDefault();
    alert(`Buy product with ID: ${productId}, Quantity: ${quantity}`);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();

    // Validate size and color selection
    if (!selectedSize || !selectedColor) {
      toast.error('Please select size and color before adding to cart.', {
        duration: 1000,
      });
      return; // Exit early if size or color is not selected
    }

    // Disable the button to prevent multiple clicks
    setIsButtonDisabled(true);

    // Simulate adding to cart with a delay
    setTimeout(() => {
      toast.success('Product added to cart.', {
        duration: 500,
      });
      setIsButtonDisabled(false); // Re-enable the button after the operation
    }, 1000);
  };

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  if (loading) {
    return (
      <section className='py-16 bg-gradient-to-b from-gray-50 to-white'>
        <div className='container mx-auto px-4'>
          <div className='flex flex-col lg:flex-row gap-8 items-start'>
            {/* Skeleton Loader for Image Section */}
            <div className='w-full lg:w-1/2'>
              <Skeleton height={500} className='rounded-xl' />
            </div>
            {/* Skeleton Loader for Product Details */}
            <div className='w-full lg:w-1/2 space-y-4'>
              <Skeleton height={40} width={200} />
              <Skeleton height={30} width={300} />
              <Skeleton height={20} width={150} />
              <Skeleton height={20} width={100} />
              <Skeleton height={20} width={200} />
              <Skeleton height={20} width={250} />
              <Skeleton height={20} width={300} />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) return <p className='text-red-500 text-center py-16'>Error: {error}</p>;

  // If there are no best-selling products, display a message
  if (bestSellers.length === 0) {
    return <p className='text-gray-600 text-center py-16'>No best-selling products available.</p>;
  }

  return (
    <section className='py-16 bg-gradient-to-b from-gray-50 to-white'>
      <div className='container mx-auto px-4'>
        <div className='flex flex-col lg:flex-row gap-8 items-start'>
          {/*** Product Image Section ***/}
          <div className='w-full lg:w-1/2 flex flex-col lg:flex-row-reverse gap-6'>
            {/*** Main Image ***/}
            <div className='relative group h-[500px] w-full lg:w-[500px] bg-white rounded-xl shadow-2xl overflow-hidden'>
              {activeImage && (
                <img
                  src={activeImage}
                  alt={bestSellerProduct.name}
                  className='w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105'
                  onMouseMove={handleZoomImage}
                  onMouseLeave={handleLeaveImageZoom}
                />
              )}
              {zoomImage && activeImage && (
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
              {/* Image Navigation Arrows */}
              <button
                className='absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors'
                onClick={handlePrevImage}
              >
                <FaChevronLeft className='text-gray-700' />
              </button>
              <button
                className='absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors'
                onClick={handleNextImage}
              >
                <FaChevronRight className='text-gray-700' />
              </button>
            </div>

            {/*** Thumbnail Gallery ***/}
            <div className='h-full'>
              <div className='flex gap-3 lg:flex-col overflow-scroll scrollbar-none h-full'>
                {bestSellerProduct.images?.map((image, index) => (
                  <div
                    className='h-24 w-24 bg-gray-100 rounded-lg p-1.5 cursor-pointer hover:shadow-lg transition-shadow duration-300'
                    key={index}
                    onClick={() => handleMouseEnterProduct(image.url, index)}
                  >
                    <img
                      src={image.url}
                      alt={image.altText || `Thumbnail ${index + 1}`}
                      className='w-full h-full object-cover rounded-md mix-blend-multiply'
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/*** Product Details ***/}
          <div className='w-full lg:w-1/2'>
            <p className='bg-[var(--color-primary)] text-white px-4 py-2 rounded-full inline-block text-sm font-medium'>
              {bestSellerProduct.brand || 'Best Seller'}
            </p>
            <h2 className='text-4xl lg:text-5xl font-bold mt-6 text-gray-900'>
              {bestSellerProduct.name}
            </h2>
            <p className='text-gray-600 mt-3 text-lg'>
              Category: {bestSellerProduct.category || 'Uncategorized'}
            </p>
            <div className='flex items-center mt-4'>
              <div className='text-yellow-400 flex items-center gap-1'>
                {Array.from({ length: 5 }).map((_, index) => (
                  <FaStar key={index} />
                ))}
              </div>
              <span className='text-sm text-gray-500 ml-2'>
                ({bestSellerProduct.rating})
              </span>
            </div>
            <div className='flex items-center gap-4 mt-6'>
              <p className='text-3xl font-bold text-[var(--color-primary)]'>
                ${bestSellerProduct.price.toFixed(2)}
              </p>
              {bestSellerProduct.discountPrice > 0 && (
                <p className='text-gray-400 line-through text-xl'>
                  ${bestSellerProduct.discountPrice.toFixed(2)}
                </p>
              )}
            </div>
            <p className='text-gray-700 mt-6 text-lg leading-relaxed'>
              {bestSellerProduct.description || 'No description available.'}
            </p>

            {/*** Sizes ***/}
            {bestSellerProduct.sizes?.length > 0 && (
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
            )}

            {/*** Colors ***/}
            {bestSellerProduct.colors?.length > 0 && (
              <div className='mt-6'>
                <h3 className='text-xl font-semibold text-gray-900'>Color</h3>
                <div className='flex gap-3 mt-2'>
                  {bestSellerProduct.colors.map((color) => (
                    <button
                      key={color}
                      className={`w-10 h-10 rounded-full border-2 ${
                        selectedColor === color
                          ? 'border-[var(--color-primary)]'
                          : 'border-gray-300'
                      } transition-colors`}
                      style={{ backgroundColor: color }}
                      onClick={() => setSelectedColor(color)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/*** Materials ***/}
            {bestSellerProduct.materials?.length > 0 && (
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
            )}

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
  );
};

export default BestSellerSingle;