import {
  HiShoppingBag,
  HiShieldCheck,
  HiGift,
  HiRefresh,
  HiStar,
  HiChat,
} from 'react-icons/hi'

function FeaturesSection() {
  return (
    <section className='py-20 px-4 bg-gradient-to-r from-green-50 to-green-100'>
      <div className='container mx-auto'>
        <h2 className='text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-12'>
          Why Choose Us?
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {/** Feature 1: Free International Shipping */}
          <div className='bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105'>
            <div className='flex flex-col items-center text-center'>
              <div className='p-4 bg-green-100 rounded-full mb-4'>
                <HiShoppingBag className='text-4xl text-green-700' />
              </div>
              <h4 className='text-xl font-semibold text-gray-900 mb-2'>
                Free International Shipping
              </h4>
              <p className='text-gray-600'>
                Enjoy free shipping on all orders over $99. Delivered straight
                to your doorstep, anywhere in the world.
              </p>
            </div>
          </div>

          {/** Feature 2: Secure Payments */}
          <div className='bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105'>
            <div className='flex flex-col items-center text-center'>
              <div className='p-4 bg-green-100 rounded-full mb-4'>
                <HiShieldCheck className='text-4xl text-green-700' />
              </div>
              <h4 className='text-xl font-semibold text-gray-900 mb-2'>
                Secure Payments
              </h4>
              <p className='text-gray-600'>
                Your transactions are safe with our advanced encryption
                technology. Shop with confidence.
              </p>
            </div>
          </div>

          {/** Feature 3: Exclusive Offers */}
          <div className='bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105'>
            <div className='flex flex-col items-center text-center'>
              <div className='p-4 bg-green-100 rounded-full mb-4'>
                <HiGift className='text-4xl text-green-700' />
              </div>
              <h4 className='text-xl font-semibold text-gray-900 mb-2'>
                Exclusive Offers
              </h4>
              <p className='text-gray-600'>
                Get access to members-only discounts, early sales, and special
                promotions.
              </p>
            </div>
          </div>

          {/** Feature 4: Easy Returns */}
          <div className='bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105'>
            <div className='flex flex-col items-center text-center'>
              <div className='p-4 bg-green-100 rounded-full mb-4'>
                <HiRefresh className='text-4xl text-green-700' />
              </div>
              <h4 className='text-xl font-semibold text-gray-900 mb-2'>
                Easy Returns
              </h4>
              <p className='text-gray-600'>
                Not satisfied? No problem. Enjoy hassle-free returns within 30
                days.
              </p>
            </div>
          </div>

          {/** Feature 5: Premium Quality */}
          <div className='bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105'>
            <div className='flex flex-col items-center text-center'>
              <div className='p-4 bg-green-100 rounded-full mb-4'>
                <HiStar className='text-4xl text-green-700' />
              </div>
              <h4 className='text-xl font-semibold text-gray-900 mb-2'>
                Premium Quality
              </h4>
              <p className='text-gray-600'>
                We source only the finest materials to ensure top-notch quality
                in every product.
              </p>
            </div>
          </div>

          {/** Feature 6: 24/7 Support */}
          <div className='bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105'>
            <div className='flex flex-col items-center text-center'>
              <div className='p-4 bg-green-100 rounded-full mb-4'>
                <HiChat className='text-4xl text-green-700' />
              </div>
              <h4 className='text-xl font-semibold text-gray-900 mb-2'>
                24/7 Customer Support
              </h4>
              <p className='text-gray-600'>
                Our dedicated support team is available around the clock to
                assist you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
