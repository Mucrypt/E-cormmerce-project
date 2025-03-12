import SponsorsBrands from '../components/Common/SponsorsBrands'
import Hero from '../components/Layout/Hero'
import BestSellerSingle from '../components/Products/BestSellerSingle'
import FeaturedCategories from '../components/Products/FeaturedCategories'
import FeaturedCollection from '../components/Products/FeaturedCollection'
import FeaturesSection from '../components/Products/FeaturesSection'
//import BestSellers from '../components/Products/BestSellers'
import GenderCollection from '../components/Products/GenderCollection'
import GridProduct from '../components/Products/GridProduct'
import NewArrivals from '../components/Products/NewArrivals'
//import ProductDetails from '../components/Products/ProductDetails'

function Home() {
  return (
    <div>
      <Hero />

      {/* Thicker Black Line Divider */}
      <div className='w-full h-0.5 bg-black my-12 opacity-20'></div>
      <GenderCollection />
      {/* Thicker Black Line Divider */}
      <div className='w-full h-0.5 bg-black my-12 opacity-20'></div>

      <NewArrivals />
      {/* Thicker Black Line Divider */}

      {/**Best Seller */}
      <div className='w-full h-0.5 bg-black my-12 opacity-20'></div>
      <h2 className='text-3xl md:text-4xl font-bold text-black mb-4 text-center'>
        Best Seller
      </h2>
      <BestSellerSingle />
      <div className='w-full h-0.5 bg-black my-12 opacity-20'></div>
      <GridProduct />
      <div className='w-full h-0.5 bg-black my-12 opacity-20'></div>
      <FeaturedCategories />
      <div className='w-full h-0.5 bg-black my-12 opacity-20'></div>
      <FeaturedCollection />
      <div className='w-full h-0.5 bg-black my-12 opacity-20'></div>
      <FeaturesSection />
      <div className='w-full h-0.5 bg-black my-12 opacity-20'></div>
      <SponsorsBrands />
    </div>
  )
}

export default Home
