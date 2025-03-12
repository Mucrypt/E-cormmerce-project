import { FaStar, FaStarHalf } from 'react-icons/fa'

const GridProduct  = () => {
  // Placeholder data for the product grid
  const products = [
    {
      _id: '1',
      image: 'https://picsum.photos/id/101/800',
      name: 'Elegant Leather Jacket',
      price: 299.99,
      rating: 4.8,
      reviews: 120,
    },
    {
      _id: '2',
      image: 'https://picsum.photos/id/102/800',
      name: 'Casual Sneakers',
      price: 99.99,
      rating: 4.5,
      reviews: 95,
    },
    {
      _id: '3',
      image: 'https://picsum.photos/id/103/800',
      name: 'Stylish Backpack',
      price: 149.99,
      rating: 4.7,
      reviews: 80,
    },
    {
      _id: '4',
      image: 'https://picsum.photos/id/104/800',
      name: 'Classic Watch',
      price: 199.99,
      rating: 4.9,
      reviews: 150,
    },
    {
      _id: '5',
      image: 'https://picsum.photos/id/110/800',
      name: 'Trendy Sunglasses',
      price: 79.99,
      rating: 4.6,
      reviews: 65,
    },
    {
      _id: '6',
      image: 'https://picsum.photos/id/106/800',
      name: 'Premium Headphones',
      price: 249.99,
      rating: 4.8,
      reviews: 200,
    },
    {
      _id: '7',
      image: 'https://picsum.photos/id/107/800',
      name: 'Designer Handbag',
      price: 349.99,
      rating: 4.9,
      reviews: 180,
    },
    {
      _id: '8',
      image: 'https://picsum.photos/id/108/800',
      name: 'Smartphone Case',
      price: 29.99,
      rating: 4.4,
      reviews: 50,
    },
  ]

  return (
    <section className='py-16 bg-gradient-to-b from-green-50 to-green-50'>
      <div className='container mx-auto px-4'>
        <h2 className='text-3xl lg:text-4xl font-bold text-center mb-8'>
          Explore More Products
        </h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {products.map((product) => (
            <div
              key={product._id}
              className='bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden group'
            >
              <div className='relative h-64 overflow-hidden'>
                <img
                  src={product.image}
                  alt={product.name}
                  className='w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110'
                />
                <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300' />
              </div>
              <div className='p-6'>
                <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                  {product.name}
                </h3>
                <div className='flex items-center mb-4'>
                  <div className='text-yellow-400 flex items-center gap-1'>
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStarHalf />
                  </div>
                  <span className='text-sm text-gray-500 ml-2'>
                    ({product.reviews} reviews)
                  </span>
                </div>
                <p className='text-2xl font-bold text-[var(--color-primary)] mb-4'>
                  ${product.price.toFixed(2)}
                </p>
                <button className='w-full bg-defaul-button text-white py-3 rounded-lg hover:bg-hero-button-hover transition-colors shadow-lg hover:shadow-xl'>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default GridProduct
