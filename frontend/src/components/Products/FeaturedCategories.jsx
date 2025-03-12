const FeaturedCategories = () => {
  const categories = [
    { name: 'Men', image: 'https://picsum.photos/id/200/800', link: '/men' },
    {
      name: 'Women',
      image: 'https://picsum.photos/id/201/800',
      link: '/women',
    },
    {
      name: 'Electronics',
      image: 'https://picsum.photos/id/202/800',
      link: '/electronics',
    },
    {
      name: 'Accessories',
      image: 'https://picsum.photos/id/203/800',
      link: '/accessories',
    },
  ]

  return (
    <section className='py-16 bg-green-50'>
      <div className='container mx-auto px-4'>
        {/* Section Heading */}
        <h2 className='text-3xl lg:text-4xl font-bold text-center mb-8'>
          Featured Categories
        </h2>

        {/* Category Cards Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {categories.map((category) => (
            <div
              key={category.name}
              className='relative h-64 rounded-xl overflow-hidden group transition-transform duration-300 hover:scale-105'
            >
              {/* Category Image */}
              <img
                src={category.image}
                alt={category.name}
                className='w-full h-full object-cover'
                loading='lazy' // Improve performance with lazy loading
              />

              {/* Overlay with Category Name */}
              <div className='absolute inset-0 bg-black bg-opacity-30 flex flex-col items-center justify-center'>
                <h3 className='text-2xl font-bold text-white mb-2'>
                  {category.name}
                </h3>
                {/* Shop Now Button */}
                <a
                  href={category.link}
                  className='px-6 py-2 bg-defaul-button text-white mt-3 font-semibold rounded-lg hover:bg-opacity-90 transition-colors duration-300'
                >
                  Shop Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedCategories
