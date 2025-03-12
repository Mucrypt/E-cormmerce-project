
import { FaStar, FaStarHalf } from 'react-icons/fa'

const BestSellers = () => {
  // Placeholder data for best sellers
  const bestSellersData = [
    {
      _id: '1',
      productImage: 'https://picsum.photos/id/1/500',
      brandName: 'Brand Name',
      productName: 'Stylish Jacket',
      category: "Men's Clothing",
      price: 149.99,
      description:
        'This stylish jacket is perfect for any occasion. Made with high-quality materials, it offers both comfort and durability.',
    },
    {
      _id: '2',
      productImage: 'https://picsum.photos/id/2/500',
      brandName: 'Brand Name',
      productName: 'Trendy T-shirt',
      category: "Men's Clothing",
      price: 49.99,
      description:
        'A trendy T-shirt that combines style and comfort. Perfect for casual outings.',
    },
    {
      _id: '3',
      productImage: 'https://picsum.photos/id/3/500',
      brandName: 'Brand Name',
      productName: 'Elegant Dress',
      category: "Women's Clothing",
      price: 99.99,
      description:
        'An elegant dress that enhances your style. Ideal for formal events.',
    },
    {
      _id: '4',
      productImage: 'https://picsum.photos/id/4/500',
      brandName: 'Brand Name',
      productName: 'Casual Sneakers',
      category: 'Footwear',
      price: 79.99,
      description:
        'Comfortable and stylish sneakers for everyday wear. Perfect for any outfit.',
    },
  ]

  const handleBuyProduct = (e, productId) => {
    e.preventDefault()
    alert(`Buy product with ID: ${productId}`)
  }

  const handleAddToCart = (e, productId) => {
    e.preventDefault()
    alert(`Add to cart product with ID: ${productId}`)
  }

  return (
    <section className='py-12 bg-gray-50'>
      <div className='container mx-auto px-4'>
        <h2 className='text-3xl font-bold text-center mb-8'>Best Sellers</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {bestSellersData.map((product) => (
            <div
              key={product._id}
              className='bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden'
            >
              <div className='relative group'>
                <img
                  src={product.productImage}
                  alt={product.productName}
                  className='w-full h-64 object-cover transform transition-transform duration-500 group-hover:scale-105'
                />
                <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300' />
              </div>
              <div className='p-4'>
                <p className='text-sm text-gray-500 uppercase'>
                  {product.brandName}
                </p>
                <h3 className='text-xl font-semibold mt-2'>
                  {product.productName}
                </h3>
                <p className='text-gray-600 mt-1'>{product.category}</p>
                <div className='flex items-center mt-2'>
                  <div className='text-yellow-400 flex items-center gap-1'>
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStarHalf />
                  </div>
                  <span className='text-sm text-gray-500 ml-2'>(4.5)</span>
                </div>
                <div className='flex items-center gap-2 mt-3'>
                  <p className='text-xl font-bold text-[var(--color-primary)]'>
                    ${product.price.toFixed(2)}
                  </p>
                  <p className='text-gray-400 line-through'>
                    ${(product.price + 50).toFixed(2)}
                  </p>
                </div>
                <div className='flex gap-3 mt-4'>
                  <button
                    className='flex-1 bg-[var(--color-primary)] text-white py-2 rounded-lg hover:bg-[var(--color-primary-dark)] transition-colors'
                    onClick={(e) => handleBuyProduct(e, product._id)}
                  >
                    Buy Now
                  </button>
                  <button
                    className='flex-1 border border-[var(--color-primary)] text-[var(--color-primary)] py-2 rounded-lg hover:bg-[var(--color-primary)] hover:text-white transition-colors'
                    onClick={(e) => handleAddToCart(e, product._id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BestSellers
